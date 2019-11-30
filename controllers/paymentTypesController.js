const router = require('express').Router();
const PaymentType = require('../models/payment_type');

// all these routes point to /api/payment-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/payment-types route root!');
});

router.get('/all', async (req, res) => {
    try {
        const data = await PaymentType.getAllPaymentTypes();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        payment_type: req.body.payment_type,
        active: req.body.active,
    };
    try {
        const data = await PaymentType.addNewPaymentType(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
    const paramsObj = {
        payment_type_id: req.body.payment_type_id,
        payment_type: req.body.payment_type,
        active: req.body.active,
    };
    try {
        const data = await PaymentType.updatePaymentTypeById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await PaymentType.deletePaymentTypeById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
