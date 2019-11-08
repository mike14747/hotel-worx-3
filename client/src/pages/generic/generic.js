import React, { Component } from 'react';

class Generic extends Component {
    state = {
        username: 'Mike',
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>This is a generic page.</h1>
                <p>Welcome {this.state.username}!</p>
            </div>
        );
    }
}

export default Generic;
