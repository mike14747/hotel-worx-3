const router = require('express').Router();
const PaymentType = require('../models/payment_types');

// all these routes point to /api/payment-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/payment-types route root!');
});

router.get('/all', (req, res) => {
    PaymentType.getAllPaymentTypes((data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = {
        payment_type: req.body.payment_type,
        active: req.body.active,
    };
    PaymentType.addNewPaymentType(paramsObj, (data) => {
        if (data.insertId) {
            res.status(200).send('Payment type was successfully added!');
        } else {
            res.status(400).send('Could not add payment type... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
    const paramsObj = {
        payment_type_id: req.body.payment_type_id,
        payment_type: req.body.payment_type,
        active: req.body.active,
    };
    PaymentType.updatePaymentTypeById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Payment type was successfully updated!');
        } else {
            res.status(400).send('Could not update payment type... please check your request and try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    PaymentType.deletePaymentTypeById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Payment type was successfully deleted!');
        } else {
            res.status(400).send('Could not delete payment type... please check your request and try again!');
        }
    });
});

module.exports = router;
