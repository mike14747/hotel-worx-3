import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import Generic from './pages/generic/generic';
import Calendar from './components/calendar/index';
import NavBar from './components/navbar/navbar';
import AxiosTest from './pages/axiosTest';
import UserContext from './components/context/userContext';

export default function App() {
    const user = { username: 'Guest', access_level: 0 };
    return (
        <Router>
            <div>
                <NavBar />
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/user">
                        <User />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/generic">
                        <Generic />
                    </Route>
                    <Route exact path="/calendar">
                        <Calendar />
                    </Route>
                    <UserContext.Provider value={user}>
                        <Route exact path="/axiostest" component={AxiosTest} />
                    </UserContext.Provider>
                    <Route path="*">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users/1')
            .then(response => response.json())
            .then(data => setUsers({ data }))
            .catch(err => console.log('There has been an error.\n\n' + err));
    }, []);

    return (
        <div>
            {users.map(user => (
                <div key={user.user_id}>
                    <p>user ID: {user.user_id}</p>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Access Level: {user.type}</p>
                    <p>Active: {user.active}</p>
                </div>
            ))}
        </div>
    );
}
