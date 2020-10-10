const router = require('express').Router();
const PaymentType = require('../models/paymentType');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { paymentTypesSchema, paymentTypeIdSchema } = require('./validation/schema/paymentTypesSchema');
const isPaymentIdValid = require('./validation/helpers/isPaymentTypeIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await PaymentType.getAllPaymentTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await paymentTypeIdSchema.validateAsync({ payment_type_id: req.params.id });
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
        await paymentTypesSchema.validateAsync(paramsObj);
        const [data, error] = await PaymentType.addNewPaymentType(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            payment_type_id: parseInt(req.body.payment_type_id),
            payment_type: req.body.payment_type,
            active: parseInt(req.body.active),
        };
        await paymentTypesSchema.validateAsync(paramsObj);
        await isPaymentIdValid(paramsObj.payment_type_id);
        const [data, error] = await PaymentType.updatePaymentTypeById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await paymentTypeIdSchema.validateAsync({ payment_type_id: req.params.id });
        await isPaymentIdValid(req.params.id);
        const [data, error] = await PaymentType.deletePaymentTypeById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
