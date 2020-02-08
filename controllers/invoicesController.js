const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoice_tax');
const InvoicePayment = require('../models/invoice_payment');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await Invoice.getAllInvoices();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Invoice.getInvoiceById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/invoice-taxes', async (req, res, next) => {
    try {
        const data = await InvoiceTax.getTaxesByInvoiceId({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/invoice-payments', async (req, res, next) => {
    try {
        const data = await InvoicePayment.getPaymentsByInvoiceId({ id: Number(req.params.id) });
        res.json(data);
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
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Invoice.deleteInvoiceById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
