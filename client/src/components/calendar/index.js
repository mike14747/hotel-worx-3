import React, { useState } from 'react';
import './calendar.css';
const startDateMin = new Date().toISOString().split('T')[0];

const Calendar = () => {
    const [state, setState] = useState({
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Calendar</h1>
            <h3>Arrival Date</h3>
            <input type="date"
                id="startDate"
                name="startDate"
                min={startDateMin}
                className="date-picker"
                onChange={handleChange}
            />
            <h3>Departure Date</h3>
            <input type="date"
                id="endDate"
                name="endDate"
                min={state.startDate}
                className="date-picker"
                onChange={handleChange}
            />
        </div >
    );
};

export default Calendar;
