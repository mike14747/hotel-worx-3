import React, { Component } from 'react';
import axios from 'axios';

class axiosTest extends Component {
    state = {
        invoice: {},
        charges: [],
        taxes: [],
        payments: [],
        res_room_id: 1001,
        invoice_id: 1,
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/invoices/id/' + this.state.invoice_id),
            axios.get('/api/charges/res-room/id/' + this.state.res_room_id),
            axios.get('/api/invoices/invoice-taxes/id/' + this.state.invoice_id),
            axios.get('/api/invoices/invoice-payments/id/' + this.state.invoice_id),
        ])
            .then(axios.spread((invoice, charges, taxes, payments) => {
                this.setState({ invoice: invoice.data[0], charges: charges.data, taxes: taxes.data, payments: payments.data });
            }))
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>This is the axios call test page.</h1>
                <h4>Hard Coded Invoice ID: {this.state.invoice_id}</h4>
                <h4>Hard Coded Res Room ID: {this.state.res_room_id}</h4>
                <b>Invoice Info:</b>
                <ul>
                    <li>Invoice ID: {this.state.invoice.invoice_id}</li>
                    <li>Total Due: {this.state.invoice.total_due}</li>
                </ul>
                <b>Reservation Info:</b>
                <ul>
                    <li>Reservation ID: {this.state.invoice.reservation_id}</li>
                    <li>Reservation Comments: {this.state.invoice.reservation_comments || 'n/a'}</li>
                </ul>
                <b>Customer Info:</b>
                <ul>
                    <li>Customer ID: {this.state.invoice.customer_id}</li>
                    <li>First Name: {this.state.invoice.first_name}</li>
                    <li>Last Name: {this.state.invoice.last_name}</li>
                    <li>Adress: {this.state.invoice.address}</li>
                    <li>City: {this.state.invoice.city}</li>
                    <li>State: {this.state.invoice.state}</li>
                    <li>Zip: {this.state.invoice.zip}</li>
                    <li>Country: {this.state.invoice.country}</li>
                    <li>Email: {this.state.invoice.email}</li>
                    <li>Phone: {this.state.invoice.phone}</li>
                    <li>Credit Card Last Four: {this.state.invoice.creditCardLastFour}</li>
                    <li>Credit Card Expiration Date: {this.state.invoice.cc_expiration}</li>
                </ul>
                <b>Res Room Info:</b>
                <ul>
                    <li>Res Room ID: {this.state.invoice.res_room_id}</li>
                    <li>Number of Nights: {this.state.invoice.num_nights}</li>
                    <li>Room Type ID: {this.state.invoice.room_type_id}</li>
                    <li>Room Type: {this.state.invoice.type}</li>
                    <li>Check-in Date: {this.state.invoice.check_in_date}</li>
                    <li>Check-out Date: {this.state.invoice.check_out_date}</li>
                    <li>Adults: {this.state.invoice.adults}</li>
                    <li>Room ID: {this.state.invoice.room_id}</li>
                    <li>Room Number: {this.state.invoice.room_num}</li>
                    <li>Room Rate: {this.state.invoice.rate}</li>
                    <li>Confirmation Code: {this.state.invoice.confirmation_code}</li>
                    <li>Res Room Comments: {this.state.invoice.res_room_comments || 'n/a'}</li>
                </ul>
                <b>Company Info:</b>
                <ul>
                    <li>Company ID: {this.state.invoice.company_id || 'n/a'}</li>
                    <li>Company Name: {this.state.invoice.company_name || 'n/a'}</li>
                </ul>
                <b>Charges:</b>
                {
                    this.state.charges.map(charge => (
                        <ul key={charge.charge_id}>
                            <li>Charge ID: {charge.charge_id}</li>
                            <li>Charge Type: {charge.charge_type}</li>
                            <li>Charge Amount: {charge.charge_amount}</li>
                            <li>Taxable: {charge.taxable}</li>
                        </ul>
                    ))
                }
                <b>Taxes:</b>
                {
                    this.state.taxes.map(tax => (
                        <ul key={tax.invoice_tax_id}>
                            <li>Invoice Tax ID: {tax.invoice_tax_id}</li>
                            <li>Tax Name: {tax.tax_name}</li>
                            <li>Tax Amount: {tax.tax_amount}</li>
                        </ul>
                    ))
                }
                <b>Payments:</b>
                {
                    this.state.payments.map(payment => (
                        <ul key={payment.invoice_payment_id}>
                            <li>Invoice Payment ID: {payment.invoice_payment_id}</li>
                            <li>Payment Type: {payment.payment_type}</li>
                            <li>Payment Amount: {payment.payment_amount}</li>
                            <li>Payment Reference Number: {payment.payment_ref_num || 'n/a'}</li>
                        </ul>
                    ))
                }
            </div >
        );
    }
}

export default axiosTest;
