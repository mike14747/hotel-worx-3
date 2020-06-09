const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoice_tax');
const InvoicePayment = require('../models/invoice_payment');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await Invoice.getAllInvoices();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Invoice.getInvoiceById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/invoice-taxes', async (req, res, next) => {
    try {
        const data = await InvoiceTax.getTaxesByInvoiceId({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/invoice-payments', async (req, res, next) => {
    try {
        const data = await InvoicePayment.getPaymentsByInvoiceId({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        invoiceObj: req.body.invoiceObj,
        invoiceTaxesArr: req.body.invoiceTaxesArr,
        invoicePaymentsArr: req.body.invoicePaymentsArr,
    };
    try {
        const data = await Invoice.addNewInvoice(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Invoice.deleteInvoiceById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
