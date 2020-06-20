const router = require('express').Router();
const ChargeType = require('../models/charge_type');

// all these routes point to /api/charge-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await ChargeType.getAllChargeTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await ChargeType.getChargeTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        charge_type: req.body.charge_type,
    };
    try {
        const [data, error] = await ChargeType.addNewChargeType(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        charge_type_id: req.body.charge_type_id,
        charge_type: req.body.charge_type,
        active: req.body.active,
    };
    try {
        const [data, error] = await ChargeType.updateChargeTypeById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await ChargeType.deleteChargeTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
