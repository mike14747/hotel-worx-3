const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoice_tax');
const InvoicePayment = require('../models/invoicePayment');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Invoice.getAllInvoices();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await Invoice.getInvoiceById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)/invoice-taxes', async (req, res, next) => {
    try {
        const [data, error] = await InvoiceTax.getTaxesByInvoiceId({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)/invoice-payments', async (req, res, next) => {
    try {
        const [data, error] = await InvoicePayment.getPaymentsByInvoiceId({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
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
        const [data, error] = await Invoice.addNewInvoice(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await Invoice.deleteInvoiceById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
