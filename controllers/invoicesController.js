const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoice_tax');
const InvoicePayment = require('../models/invoice_payment');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', async (req, res) => {
    try {
        const data = await Invoice.getAllInvoices();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed.. please check your request and try again!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Invoice.getInvoiceById(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id/invoice-taxes', async (req, res) => {
    try {
        const data = await InvoiceTax.getTaxesByInvoiceId(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id/invoice-payments', async (req, res) => {
    try {
        const data = await InvoicePayment.getPaymentsByInvoiceId(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        invoiceObj: req.body.invoiceObj,
        invoiceTaxesArr: req.body.invoiceTaxesArr,
        invoicePaymentsArr: req.body.invoicePaymentsArr,
    };
    try {
        const data = await Invoice.addNewInvoice(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Invoice.deleteInvoiceById(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
