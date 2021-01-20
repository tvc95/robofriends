import React, { useState, useEffect } from 'react';
import './app.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value))
})

const App = (props) => {
    // console.log(props.store.getState());
    // Hooks
    // Declaring a new state variable
    const [robots, setRobots] = useState([]);
    const [count,setCount] = useState(0);

    const { searchField, onSearchChange } = props;

    //The array at the end of useEffect is equivalent to "componentDidMount"
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));

        console.log(count);
    },[count]); //only run if "count" changes

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

export default connect(mapStateToProps, mapDispatchToProps)(App);