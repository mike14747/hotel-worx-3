const router = require('express').Router();
const ChargeType = require('../models/charge_type');

// all these routes point to /api/charge-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await ChargeType.getAllChargeTypes();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await ChargeType.getChargeTypeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        charge_type: req.body.charge_type,
    };
    try {
        const data = await ChargeType.addNewChargeType(paramsObj);
        res.json(data);
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
        const data = await ChargeType.updateChargeTypeById(paramsObj);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await ChargeType.deleteChargeTypeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
