import React, {useEffect, useState} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
    const [ robots, setRobots] = useState([]);
    const [ searchfield, setSearchField] = useState('');
    const [ date ] = useState(new Date());
    const [ type, setType ] = useState(0);
    const [ title, setTitle ] = useState("RoboFriends")
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then( response => response.json())
        .then( users => {setRobots(users)});
    },[])

    useEffect(() => {
            if(type === 0) {
                setTitle("RoboFriends")
            }
            else {
                setTitle("CatFriends")
            }
            document.title = title
    },[type, title])

    const onSearchChange = (event) => {
        setSearchField(  event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    return !robots.length ?
            <h1>Loading...</h1> :

            <div className='tc'>
                <h1 className='f1'>{title}</h1>
                <SearchBox searchChange={onSearchChange}/>
                <button className='tc br-pill bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5' 
                onClick={() => setType(0)}>Robots</button>
                <button className='tc br-pill bg-hot-pink dib br3 pa3 ma2 grow bw2 shadow-5' onClick={() => setType(4)}>Cats</button>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} type={type} />
                    </ErrorBoundary>
                </Scroll>
                <h1>It is {date.toLocaleDateString()} at {date.toLocaleTimeString()}</h1>
            </div>
        };

export default App;
