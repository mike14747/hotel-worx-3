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

router.get('/id/:id', (req, res) => {
    Invoice.getInvoiceById(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/invoice-taxes/id/:id', (req, res) => {
    InvoiceTax.getTaxesByInvoiceId(req.params.id,(data) => {
        res.json(data);
    });
});

router.get('/invoice-payments/id/:id', (req, res) => {
    InvoicePayment.getPaymentsByInvoiceId(req.params.id,(data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const { invoiceObj, invoiceTaxesArr, invoicePaymentsArr } = { ...req.body };
    (async () => {
        const newInvoice = await Invoice.addNewInvoice(invoiceObj);
        const invoiceTaxesArr2 = invoiceTaxesArr.map((tax) => {
            return [newInvoice.insertId, tax.tax_id, tax.tax_amount];
        });
        const invoicePaymentsArr2 = invoicePaymentsArr.map((payment) => {
            return [newInvoice.insertId, payment.payment_type_id, payment.payment_amount, payment.payment_ref_num];
        });
        await Promise.all([
            InvoiceTax.addNewInvoiceTaxes(invoiceTaxesArr2),
            InvoicePayment.addNewInvoicePayments(invoicePaymentsArr2),
        ]);
        res.json({ invoice_id: newInvoice.insertId });
    })();
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
