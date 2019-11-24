const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoice_tax');
const InvoicePayment = require('../models/invoice_payment');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/invoices route root!');
});

router.get('/all', (req, res) => {
    Invoice.getAllInvoices((data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = [req.body.res_room_id, req.body.num_nights, req.body.rate, req.body.total_due];
    Invoice.AddNewInvoice(paramsObj, (data1) => {
        if (data1.insertId) {
            // maybe use an async/await here to post the new invoice-taxes and invoice-payments, then proceed when both are done... both are waiting to get the new invoice_id before being run (await Promise.all)
        }
    });
});

router.delete('/:id', (req, res) => {
    Invoice.deleteInvoiceById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Invoice was successfully deleted!');
        } else {
            res.status(400).send('Could not delete Invoice... please check your request and try again!');
        }
    });
});

module.exports = router;
