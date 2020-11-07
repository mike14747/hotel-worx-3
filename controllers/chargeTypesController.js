const router = require('express').Router();
const ChargeType = require('../models/chargeType');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { chargeTypesSchema, chargeTypeIdSchema } = require('./validation/schema/chargeTypesSchema');
const isChargeTypeIdValid = require('./validation/helpers/isChargeTypeIdValid');

// all these routes point to /api/charge-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await ChargeType.getAllChargeTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await chargeTypeIdSchema.validateAsync({ charge_type_id: req.params.id });
        const [data, error] = await ChargeType.getChargeTypeById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            charge_type: req.body.charge_type,
            active: parseInt(req.body.active),
        };
        await chargeTypesSchema.validateAsync(paramsObj);
        const [data, error] = await ChargeType.addNewChargeType(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_type: req.body.charge_type,
            active: parseInt(req.body.active),
        };
        await chargeTypesSchema.validateAsync(paramsObj);
        await chargeTypeIdSchema.validateAsync({ charge_type_id: req.body.charge_type_id });
        await isChargeTypeIdValid(paramsObj.charge_type_id);
        const [data, error] = await ChargeType.updateChargeTypeById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await chargeTypeIdSchema.validateAsync({ charge_type_id: req.params.id });
        await isChargeTypeIdValid(req.params.id);
        const [data, error] = await ChargeType.deleteChargeTypeById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
