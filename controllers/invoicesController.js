const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoice_tax');
const InvoicePayment = require('../models/invoice_payment');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/invoices route root!');
});

router.get('/all', async (req, res) => {
    try {
        const data = await Invoice.getAllInvoices();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const data = await Invoice.getInvoiceById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/invoice-taxes/id/:id', async (req, res) => {
    try {
        const data = await InvoiceTax.getTaxesByInvoiceId(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/invoice-payments/id/:id', async (req, res) => {
    try {
        const data = await InvoicePayment.getPaymentsByInvoiceId(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const { invoiceObj, invoiceTaxesArr, invoicePaymentsArr } = { ...req.body };
    try {
        const data = await Invoice.addNewInvoice(invoiceObj);
        const invoiceTaxesArr2 = invoiceTaxesArr.map((tax) => {
            return [data.insertId, tax.tax_id, tax.tax_amount];
        });
        const invoicePaymentsArr2 = invoicePaymentsArr.map((payment) => {
            return [data.insertId, payment.payment_type_id, payment.payment_amount, payment.payment_ref_num];
        });
        await Promise.all([
            InvoiceTax.addNewInvoiceTaxes(invoiceTaxesArr2),
            InvoicePayment.addNewInvoicePayments(invoicePaymentsArr2),
        ]);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Invoice.deleteInvoiceById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
