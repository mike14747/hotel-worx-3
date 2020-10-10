const router = require('express').Router();
const Invoice = require('../models/invoice');
const InvoiceTax = require('../models/invoiceTax');
const InvoicePayment = require('../models/invoicePayment');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Invoice.getAllInvoices();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {

        const [data, error] = await Invoice.getInvoiceById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/invoice-taxes', async (req, res, next) => {
    try {

        const [data, error] = await InvoiceTax.getTaxesByInvoiceId({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/invoice-payments', async (req, res, next) => {
    try {

        const [data, error] = await InvoicePayment.getPaymentsByInvoiceId({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            invoiceObj: req.body.invoiceObj,
            invoiceTaxesArr: req.body.invoiceTaxesArr,
            invoicePaymentsArr: req.body.invoicePaymentsArr,
        };

        const [data, error] = await Invoice.addNewInvoice(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {

        const [data, error] = await Invoice.deleteInvoiceById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
