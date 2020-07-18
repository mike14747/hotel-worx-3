const router = require('express').Router();
const Charge = require('../models/charge');
const { isChargeBodyValid } = require('./validation/chargesValidation');
const { idRegEx, idErrorObj } = require('./validation/idValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Charge.getAllCharges();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Charge.getChargeById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/res-rooms/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Charge.getChargesByResRoomId({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    if (!idRegEx.test(req.body.res_room_id) || !idRegEx.test(req.body.charge_type_id)) return res.status(400).json(idErrorObj);
    try {
        const paramsObj = {
            res_room_id: parseInt(req.body.res_room_id),
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_amount: parseFloat(req.body.charge_amount),
            taxable: parseInt(req.body.taxable),
        };
        const [result, errorObj] = await isChargeBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Charge.addNewCharge(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add the new charge!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    if (!idRegEx.test(req.body.res_room_id) || !idRegEx.test(req.body.charge_id) || !idRegEx.test(req.body.charge_type_id)) return res.status(400).json(idErrorObj);
    try {
        const paramsObj = {
            res_room_id: parseInt(req.body.res_room_id),
            charge_id: parseInt(req.body.charge_id),
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_amount: parseFloat(req.body.charge_amount),
            taxable: parseInt(req.body.taxable),
        };
        const [result, errorObj] = await isChargeBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Charge.updateChargeById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to update the charge!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Charge.deleteChargeById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'No charge was found with that charge_id!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/res-rooms/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Charge.deleteChargesByResRoomId({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: 'No charges were found with that res_room_id!' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
