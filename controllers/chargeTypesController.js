const router = require('express').Router();
const ChargeType = require('../models/chargeType');
const { isChargeTypeValid } = require('./validation/chargeTypesValidation');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');

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
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
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
        const [result, errorObj] = await isChargeTypeValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await ChargeType.addNewChargeType(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        if (!idRegEx.test(req.body.charge_type_id)) return res.status(400).json(idErrorObj);
        const paramsObj = {
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_type: req.body.charge_type,
            active: parseInt(req.body.active),
        };
        const [result, errorObj] = await isChargeTypeValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await ChargeType.updateChargeTypeById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await ChargeType.deleteChargeTypeById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
