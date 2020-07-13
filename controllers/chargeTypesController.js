const router = require('express').Router();
const ChargeType = require('../models/chargeType');
const { isChargeTypeValid } = require('./utils/chargeTypesValidation');
const { idRegEx, idErrorObj } = require('./utils/idValidation');

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
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add a new charge_type!' });
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
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to update a charge_type!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await ChargeType.deleteChargeTypeById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred... probably because of a foreign key constraint on that charge type. A better option might be to make this charge type inactive.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
