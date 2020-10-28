import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Calendar from './components/calendar/index';
import NavBar from './components/navbar/navbar';
import Generic from './pages/generic/generic';
import AxiosTest from './pages/axiosTest/axiosTest';
import UserContext from './context/userContext';
import SplitContext from './context/splitContext';
import Loading from './components/loading/loading';
import axios from 'axios';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import NoMatch from './pages/noMatch/noMatch';
import Login from './pages/login/login';
import './css/my_style.css';
import './css/styles.css';
import Home from './pages/home/home';

export default function App() {
    const [user, setUser] = useState(null);
    const [split, setSplit] = useState(null);
    const [hasStatusLoaded, setHasStatusLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/auth/status')
            .then(response => {
                setUser(response.data.user);
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
            })
            .finally(() => setHasStatusLoaded(true));
    }, []);

    if (!hasStatusLoaded) {
        return (
            <div className="m-5">
                <Loading />
            </div>
        );
    }

    return (
        <Router>
            <UserContext.Provider value={{ user, setUser }}>
                <SplitContext.Provider value={{ split, setSplit }}>
                    <div className="container py-4 flex-fill bg-white border border-secondary">
                        <NavBar />
                        <Switch>
                            <Route exact path="/about">
                                <About />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/generic" component={Generic} />
                            <Route exact path="/calendar" component={Calendar} />
                            <ProtectedRoute exact path="/axiostest" user={user} component={AxiosTest} />
                            <Route exact path="/login">
                                {user ? <Redirect to="/" /> : <Login />}
                            </Route>
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </SplitContext.Provider>
            </UserContext.Provider>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}
