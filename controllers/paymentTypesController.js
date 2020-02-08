const router = require('express').Router();
const PaymentType = require('../models/payment_type');

// all these routes point to /api/payment-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await PaymentType.getAllPaymentTypes();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await PaymentType.getPaymentTypeById({ id: Number(req.params.id) });
        res.json(data);
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
        const data = await PaymentType.addNewPaymentType(paramsObj);
        res.json(data);
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
        const data = await PaymentType.updatePaymentTypeById(paramsObj);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await PaymentType.deletePaymentTypeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
