import React, { Component } from 'react';
import './calendar.css';
import moment from 'moment';
const startDateMin = new Date().toISOString().split('T')[0];
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.handlechange = this.handlechange.bind(this);
    }
    state = {
        startDate: '',
        endDate: '',
    };
  
    handlechange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <h1>Calendar</h1>
                <h3>Arrival Date</h3>
                <input type="date"
                    id="startDate"  
                    name="startDate"
                    min={startDateMin}
                    className="date-picker"
                    onChange={this.handlechange}
                />
                <h3>Departure Date</h3>
                <input type="date"
                    id="endDate"
                    name="endDate"
                    min={this.state.startDate }
                    className="date-picker"
                    onChange={this.handlechange}
                />
            </div >
        );
    }
}
export default Calendar;