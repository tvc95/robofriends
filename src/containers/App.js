import React, { useState, useEffect } from 'react';
import './app.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
    // Hooks
    // Declaring a new state variable
    const [searchField, setSearchField] = useState("");
    const [robots, setRobots] = useState([]);
    const [count,setCount] = useState(0);

    //The array at the end of useEffect is equivalent to "componentDidMount"
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));

        console.log(count);
    },[count]); //only run if "count" changes
    
    const onSearchChange = (event) => {
        setSearchField(event.target.value);
        // in hooks, the function above substitutes 
        //this.setState({ searchField: event.target.value });
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
    )

}

export default App;