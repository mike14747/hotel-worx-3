const router = require('express').Router();
const ChargeType = require('../models/chargeType');
const { chargeTypeExists } = require('./utils/chargeTypesValidation');

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
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await ChargeType.getChargeTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const errorArray = [];
        if (typeof (req.body.charge_type) !== 'string' || req.body.charge_type.length < 1) errorArray.push('charge_type should be a string with non-zero length');
        if (!/^[0-1]$/.test(req.body.active)) errorArray.push('active parameter is a boolean and should be 0 or 1');
        if (errorArray.length > 0) {
            return res.status(400).json({
                message: 'Errors exist in the transmitted request body.',
                errorList: errorArray,
            });
        }
        const paramsObj = {
            charge_type: req.body.charge_type,
            active: parseInt(req.body.active),
        };
        const [data, error] = await ChargeType.addNewChargeType(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add a new charge_type!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const errorArray = [];
        const [doesChargeTypeExist, chargeTypeErrorMsg] = await chargeTypeExists(req.body.charge_type_id);
        if (!doesChargeTypeExist) errorArray.push(chargeTypeErrorMsg);
        if (typeof (req.body.charge_type) !== 'string' || req.body.charge_type.length < 1) errorArray.push('charge_type should be a string with non-zero length');
        if (!/^[0-1]$/.test(req.body.active)) errorArray.push('active parameter is a boolean and should be 0 or 1');
        if (errorArray.length > 0) {
            return res.status(400).json({
                message: 'Errors exist in the transmitted request body.',
                errorList: errorArray,
            });
        }
        const paramsObj = {
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_type: req.body.charge_type,
            active: parseInt(req.body.active),
        };
        const [data, error] = await ChargeType.updateChargeTypeById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to update a charge_type!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await ChargeType.deleteChargeTypeById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: `No charge_type was found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
