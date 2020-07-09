const router = require('express').Router();
const PaymentType = require('../models/paymentType');

// all these routes point to /api/payment-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await PaymentType.getAllPaymentTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await PaymentType.getPaymentTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        payment_type: req.body.payment_type,
        active: req.body.active,
    };
    try {
        const [data, error] = await PaymentType.addNewPaymentType(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        payment_type_id: req.body.payment_type_id,
        payment_type: req.body.payment_type,
        active: req.body.active,
    };
    try {
        const [data, error] = await PaymentType.updatePaymentTypeById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await PaymentType.deletePaymentTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
