import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import Generic from './pages/generic/generic';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/customers">Customers</Link>
                        </li>
                        <li>
                            <Link to="/generic">Generic</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/customers">
                        <Customers />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/generic">
                        <Generic />
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

class Customers extends Component {
    state = {
        customerArray: [],
    };

    componentDidMount() {
        fetch('/api/customer/id/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ customerArray: data });
            })
            .catch(error => {
                console.log('There has been an error.\n\n' + error);
            });
    }

    render() {
        return (
            <div>
                {this.state.customerArray.map(customer => (
                    <div key={customer.customer_id}>
                        <p>Customer ID: {customer.customer_id}</p>
                        <p>Username: {customer.username}</p>
                        <p>Email: {customer.email}</p>
                    </div>
                ))}
            </div>

        );
    }
}
