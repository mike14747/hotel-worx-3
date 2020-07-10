const router = require('express').Router();
const ChargeType = require('../models/chargeType');
const { chargeTypeExists, chargeTypeValid, activeValid } = require('./utils/chargeTypesValidation');

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
        const [isChargeTypeValid, chargeTypeValidErrorMsg] = chargeTypeValid(req.body.charge_type);
        if (!isChargeTypeValid) errorArray.push(chargeTypeValidErrorMsg);
        const [isActiveValid, activeValidErrorMsg] = activeValid(req.body.active);
        if (!isActiveValid) errorArray.push(activeValidErrorMsg);
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
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add the new charge_type!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const errorArray = [];
        const [doesChargeTypeExist, chargeTypeErrorMsg] = await chargeTypeExists(req.body.charge_type_id);
        if (!doesChargeTypeExist) errorArray.push(chargeTypeErrorMsg);
        const [isChargeTypeValid, chargeTypeValidErrorMsg] = chargeTypeValid(req.body.charge_type);
        if (!isChargeTypeValid) errorArray.push(chargeTypeValidErrorMsg);
        const [isActiveValid, activeValidErrorMsg] = activeValid(req.body.active);
        if (!isActiveValid) errorArray.push(activeValidErrorMsg);
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
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: `No charge_type was found with id ${req.params.id}!` });
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
