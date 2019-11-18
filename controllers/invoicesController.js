const router = require('express').Router();
const Invoice = require('../models/invoice');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/invoices route root!');
});

router.get('/all', (req, res) => {
    Invoice.getAllInvoices(req.params.some_param, (data) => {
        res.json(data);
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
