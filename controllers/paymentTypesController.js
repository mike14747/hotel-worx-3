const router = require('express').Router();
const PaymentType = require('../models/paymentType');
const { isPaymentTypeValid } = require('./validation/paymentTypesValidation');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');

// all these routes point to /api/payment-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await PaymentType.getAllPaymentTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await PaymentType.getPaymentTypeById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            payment_type: req.body.payment_type,
            active: parseInt(req.body.active),
        };
        const [result, errorObj] = await isPaymentTypeValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await PaymentType.addNewPaymentType(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        if (!idRegEx.test(req.body.payment_type_id)) return res.status(400).json(idErrorObj);
        const paramsObj = {
            payment_type_id: parseInt(req.body.payment_type_id),
            payment_type: req.body.payment_type,
            active: parseInt(req.body.active),
        };
        const [result, errorObj] = await isPaymentTypeValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await PaymentType.updatePaymentTypeById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await PaymentType.deletePaymentTypeById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
