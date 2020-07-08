const router = require('express').Router();
const Charge = require('../models/charge');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Charge.getAllCharges();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.getChargeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/res-rooms/:id', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.getChargesByResRoomId({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            res_room_id: req.body.res_room_id,
            charge_type_id: req.body.charge_type_id,
            charge_amount: req.body.charge_amount,
            taxable: req.body.taxable,
        };
        const [data, error] = await Charge.addNewCharge(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            charge_id: req.body.charge_id,
            charge_type_id: req.body.charge_type_id,
            charge_amount: req.body.charge_amount,
            taxable: req.body.taxable,
        };
        const [data, error] = await Charge.updateChargeById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.deleteChargeById({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No charges were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

router.delete('/res-rooms/:id', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.deleteChargesByResRoomId({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No charges for res_rooms were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
