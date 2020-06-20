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
        axios.all([
            axios.get('/api/invoices/' + invoiceId),
            axios.get('/api/charges/res-rooms/' + resRoomId),
            axios.get('/api/invoices/' + invoiceId + '/invoice-taxes'),
            axios.get('/api/invoices/' + invoiceId + '/invoice-payments'),
        ])
            .then(axios.spread((invoice, charges, taxes, payments) => {
                setInvoice(invoice.data[0]);
                setCharges(charges.data);
                setTaxes(taxes.data);
                setPayments(payments.data);
            }))
            .catch((err) => {
                console.log(err);
            });
    }, [invoiceId]);

    return (
        <div>
            <h1>This is the axios call test page.</h1>
            <h4>Hard Coded Invoice ID: {invoiceId}</h4>
            <h4>Hard Coded Res Room ID: {resRoomId}</h4>
            <b>User Info:</b>
            <ul>
                <li>Username: {user.username}</li>
                <li>Access Level: {user.access_level}</li>
            </ul>
            <b>Invoice Info:</b>
            <ul>
                <li>Invoice ID: {invoiceId}</li>
                <li>Total Due: {invoice.total_due}</li>
            </ul>
            <b>Reservation Info:</b>
            <ul>
                <li>Reservation ID: {invoice.reservation_id}</li>
                <li>Reservation Comments: {invoice.reservation_comments || 'n/a'}</li>
            </ul>
            <b>Customer Info:</b>
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
            <b>Res Room Info:</b>
            <ul>
                <li>Res Room ID: {invoice.res_room_id}</li>
                <li>Number of Nights: {invoice.num_nights}</li>
                <li>Room Type ID: {invoice.room_type_id}</li>
                <li>Room Type: {invoice.type}</li>
                <li>Check-in Date: {invoice.check_in_date}</li>
                <li>Check-out Date: {invoice.check_out_date}</li>
                <li>Adults: {invoice.adults}</li>
                <li>Room ID: {invoice.room_id}</li>
                <li>Room Number: {invoice.room_num}</li>
                <li>Room Rate: {invoice.rate}</li>
                <li>Confirmation Code: {invoice.confirmation_code}</li>
                <li>Res Room Comments: {invoice.res_room_comments || 'n/a'}</li>
            </ul>
            <b>Company Info:</b>
            <ul>
                <li>Company ID: {invoice.company_id || 'n/a'}</li>
                <li>Company Name: {invoice.company_name || 'n/a'}</li>
            </ul>
            <b>Charges:</b>
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
            <b>Taxes:</b>
            {
                taxes.map(tax => (
                    <ul key={tax.invoice_tax_id}>
                        <li>Invoice Tax ID: {tax.invoice_tax_id}</li>
                        <li>Tax Name: {tax.tax_name}</li>
                        <li>Tax Amount: {tax.tax_amount}</li>
                    </ul>
                ))
            }
            <b>Payments:</b>
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
