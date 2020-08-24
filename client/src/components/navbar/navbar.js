import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import smallLogo from './solidcolor.png';
import './style.css';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <button onClick={this.toggle}> <img variant="top" src={smallLogo} id="smallLogo" alt="smallLogo" /></button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>
                            <h2><strong>Hotel Worx</strong></h2>
                        </ModalHeader>
                        <ModalBody>
                            <div id="infoCard">
                                {/* {this.state.hotelInfo.map(info => (
                                    <div key={info.hotel_info_id} id="hotelInfoPart" className="my-auto">
                                        <div className="text-center" id="hotelName">{info.hotel_name}</div>
                                        <div className="small faded" id="hotelAddress">{info.address}</div>
                                        <div className="small faded" id="hotelAddress">{info.city}, {info.state} {info.zip}</div>
                                        <div className="small faded" id="hotelEmail">{info.email}</div>
                                        <div className="text-center" id="hotelPhone"><i className="fa fa-phone fa-rotate-90"></i>{info.phone}</div>
                                        <br />
                                    </div>
                                ))}
                                <div className="py-xl-2"></div>
                                <div className="card-text m-0 my-auto">
                                    <ReactWeather
                                        forecast="today"
                                        apikey={process.env.REACT_APP_WEATHER_API_KEY}
                                        type="city"
                                        city="Cleveland"
                                        units='F' />
                                </div> */}
                            </div>
                        </ModalBody>
                    </Modal>
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
                            <i className="fas fa-columns fa-2x" style={{ marginRight: '30px' }}></i>
                            <Navbar.Text>
                                User: <a href="#login" style={{ marginRight: '20px' }}>Mark Otto</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <button className="btn btn-danger" id="logOut" ><i className="fa fa-sign-out-alt"></i></button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        );
    }
}
export default NavBar;
