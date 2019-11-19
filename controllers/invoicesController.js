const router = require('express').Router();
const Invoice = require('../models/invoice');
const ResRoom = require('../models/res_room');

// all these routes point to /api/invoices as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/invoices route root!');
});

router.get('/all', (req, res) => {
    Invoice.getAllInvoices(req.params.some_param, (data) => {
        res.json(data);
    });
});

router.post('/invoice', (req, res) => {
    ResRoom.selectForInvoice(req.body.res_room_id, (data1) => {
        const paramsObj = [req.body.res_room_id, data1[0].reservation_id, data1[0].num_nights, data1[0].rate, data1[0].total_due];
        Invoice.AddNewInvoice(paramsObj, (data2) => {
            res.json(data2.insertId);
        });
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
