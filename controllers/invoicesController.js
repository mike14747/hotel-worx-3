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
    const paramsObj1 = {
        res_room_id: req.body.res_room_id,
        num_nights: req.body.num_nights,
        rate: req.body.rate,
        total_due: req.body.total_due,
    };
    async function handleInvoiceSteps() {
        const newInvoice = await Invoice.addNewInvoice(paramsObj1);
        console.log(newInvoice);
        const paramsObj2 = {
            invoice_id: 10,
            tax_id: req.body.tax_id,
            tax_amount: req.body.tax_amount,
        };
        const paramsObj3 = {
            invoice_id: 10,
            payment_type_id: req.body.payment_type_id,
            payment_amount: req.body.payment_amount,
            payment_ref_num: req.body.payment_ref_num,
        };
        const newInvoiceTaxes = InvoiceTax.addNewInvoiceTaxes(paramsObj2);
        const newInvoicePayments = InvoicePayment.addNewInvoicePayments(paramsObj3);
        await Promise.all([newInvoiceTaxes, newInvoicePayments]);
        res.json({ invoice_id: 10 });
    }
    handleInvoiceSteps();
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
