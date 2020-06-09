const router = require('express').Router();
const Charge = require('../models/charge');

// all these routes point to /api/charges as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await Charge.getAllCharges();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Charge.getChargeById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/res-rooms/:id', async (req, res, next) => {
    try {
        const data = await Charge.getChargesByResRoomId({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        charge_type_id: req.body.charge_type_id,
        charge_amount: req.body.charge_amount,
        taxable: req.body.taxable,
    };
    try {
        const data = await Charge.addNewCharge(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        charge_id: req.body.charge_id,
        charge_type_id: req.body.charge_type_id,
        charge_amount: req.body.charge_amount,
        taxable: req.body.taxable,
    };
    try {
        const data = await Charge.updateChargeById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Charge.deleteChargeById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/res-rooms/:id', async (req, res, next) => {
    try {
        const data = await Charge.deleteChargesByResRoomId({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
