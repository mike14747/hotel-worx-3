import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import smallLogo from './solidcolor.png';
import "./style.css";

class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                        <img variant="top" src={smallLogo} className="App-logo" id="smallLogo" alt="smallLogo" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Reservation" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">New Reservation</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Update Reservation</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Front Desk" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Arrivals</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">In-House Guests</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Maintenance</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Finance" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Billing</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Reports" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Housekeeping Report</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Detailed Availability</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">House Status</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                User: <a href="#login">Mark Otto</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <button className="btn btn-danger" id="logOut">Log Out</button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        );
    }
}
export default NavBar;
