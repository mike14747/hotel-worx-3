import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../components/context/userContext';

export default function AxiosTest() {
    const [invoice, setInvoice] = useState({});
    const [charges, setCharges] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [payments, setPayments] = useState([]);
    const resRoomId = 1001;
    const invoiceId = 1;
    const user = useContext(UserContext);

    // const apiRoot = process.env.REACT_APP_API_ROOT;

    useEffect(() => {
        axios.get('/api/invoices/' + invoiceId)
            .then(response => setInvoice(response.data[0]))
            .catch(error => console.log(error));
        axios.get('/api/charges/res-rooms/' + resRoomId)
            .then(response => setCharges(response.data))
            .catch(error => console.log(error));
        axios.get('/api/invoices/' + invoiceId + '/invoice-taxes')
            .then(response => setTaxes(response.data))
            .catch(error => console.log(error));
        axios.get('/api/invoices/' + invoiceId + '/invoice-payments')
            .then(response => setPayments(response.data))
            .catch(error => console.log(error));
    }, [invoiceId]);

    return (
        <div>
            <h1>This is the axios call test page.</h1>
            <h4>Hard Coded Invoice ID: {invoiceId}</h4>
            <h4>Hard Coded Res Room ID: {resRoomId}</h4>
            <p><b>User Info:</b></p>
            <ul>
                <li>Username: {user.username}</li>
                <li>Access Level: {user.access_level}</li>
            </ul>
            <p><b>Invoice Info:</b></p>
            <ul>
                <li>Invoice ID: {invoiceId}</li>
                <li>Total Due: {invoice.total_due}</li>
            </ul>
            <p><b>Reservation Info:</b></p>
            <ul>
                <li>Reservation ID: {invoice.reservation_id}</li>
                <li>Reservation Comments: {invoice.reservation_comments || 'n/a'}</li>
            </ul>
            <p><b>Customer Info:</b></p>
            <ul>
                <li>Customer ID: {invoice.customer_id}</li>
                <li>First Name: {invoice.first_name}</li>
                <li>Last Name: {invoice.last_name}</li>
                <li>Adress: {invoice.address}</li>
                <li>City: {invoice.city}</li>
                <li>State: {invoice.state}</li>
                <li>Zip: {invoice.zip}</li>
                <li>Country: {invoice.country}</li>
                <li>Email: {invoice.email}</li>
                <li>Phone: {invoice.phone}</li>
                <li>Credit Card Last Four: {invoice.creditCardLastFour}</li>
                <li>Credit Card Expiration Date: {invoice.cc_expiration}</li>
            </ul>
            <p><b>Res Room Info:</b></p>
            <ul>
                <li>Res Room ID: {invoice.res_room_id}</li>
                <li>Number of Nights: {invoice.num_nights}</li>
                <li>Room Type ID: {invoice.room_type_id}</li>
                <li>Room Type: {invoice.room_type}</li>
                <li>Check-in Date: {invoice.check_in_date}</li>
                <li>Check-out Date: {invoice.check_out_date}</li>
                <li>Adults: {invoice.adults}</li>
                <li>Room ID: {invoice.room_id}</li>
                <li>Room Number: {invoice.room_num}</li>
                <li>Room Rate: {invoice.room_rate}</li>
                <li>Confirmation Code: {invoice.confirmation_code}</li>
                <li>Res Room Comments: {invoice.res_room_comments || 'n/a'}</li>
            </ul>
            <p><b>Company Info:</b></p>
            <ul>
                <li>Company ID: {invoice.company_id || 'n/a'}</li>
                <li>Company Name: {invoice.company_name || 'n/a'}</li>
            </ul>
            <p><b>Charges:</b></p>
            {
                charges.map(charge => (
                    <ul key={charge.charge_id}>
                        <li>Charge ID: {charge.charge_id}</li>
                        <li>Charge Type: {charge.charge_type}</li>
                        <li>Charge Amount: {charge.charge_amount}</li>
                        <li>Taxable: {charge.taxable}</li>
                    </ul>
                ))
            }
            <p><b>Taxes:</b></p>
            {
                taxes.map(tax => (
                    <ul key={tax.invoice_tax_id}>
                        <li>Invoice Tax ID: {tax.invoice_tax_id}</li>
                        <li>Tax Name: {tax.tax_name}</li>
                        <li>Tax Amount: {tax.tax_amount}</li>
                    </ul>
                ))
            }
            <p><b>Payments:</b></p>
            {
                payments.map(payment => (
                    <ul key={payment.invoice_payment_id}>
                        <li>Invoice Payment ID: {payment.invoice_payment_id}</li>
                        <li>Payment Type: {payment.payment_type}</li>
                        <li>Payment Amount: {payment.payment_amount}</li>
                        <li>Payment Reference Number: {payment.payment_ref_num || 'n/a'}</li>
                    </ul>
                ))
            }
        </div>
    );
}
