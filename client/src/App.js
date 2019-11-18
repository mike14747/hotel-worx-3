import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import Generic from './pages/generic/generic';
import Calendar from './components/calendar/index';
import NavBar from './components/navbar/navbar';

export default function App() {
    return (
        <Router>
            <div>
                <NavBar />
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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

class User extends Component {
    state = {
        userArray: [],
    };

    componentDidMount() {
        fetch('/api/user/id/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ userArray: data });
            })
            .catch(error => {
                console.log('There has been an error.\n\n' + error);
            });
    }

    render() {
        return (
            <div>
                {this.state.userArray.map(user => (
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
}
