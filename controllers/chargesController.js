const router = require('express').Router();
const Charge = require('../models/charge');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { chargesSchema, chargeIdSchema } = require('./validation/schema/chargesSchema');
const { resRoomIdSchema } = require('./validation/schema/resRoomsSchema');
const isChargeIdValid = require('./validation/helpers/isChargeIdValid');
const isResRoomIdValid = require('./validation/helpers/isResRoomIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Charge.getAllCharges();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await chargeIdSchema.validateAsync({ charge_id: req.params.id });
        const [data, error] = await Charge.getChargeById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/res-rooms/:id', async (req, res, next) => {
    try {
        const [data, error] = await Charge.getChargesByResRoomId({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            res_room_id: parseInt(req.body.res_room_id),
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_amount: parseFloat(req.body.charge_amount),
            taxable: parseInt(req.body.taxable),
        };
        await chargesSchema.validateAsync(paramsObj);
        await isResRoomIdValid(paramsObj.res_room_id);
        const [data, error] = await Charge.addNewCharge(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            res_room_id: parseInt(req.body.res_room_id),
            charge_id: parseInt(req.body.charge_id),
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_amount: parseFloat(req.body.charge_amount),
            taxable: parseInt(req.body.taxable),
        };
        await chargesSchema.validateAsync(paramsObj);
        await isChargeIdValid(paramsObj.charge_id);
        await isResRoomIdValid(paramsObj.res_room_id);
        const [data, error] = await Charge.updateChargeById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await chargeIdSchema.validateAsync({ charge_id: req.params.id });
        await isChargeIdValid(req.params.id);
        const [data, error] = await Charge.deleteChargeById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

router.delete('/res-rooms/:id', async (req, res, next) => {
    try {
        await resRoomIdSchema.validateAsync({ res_room_id: req.params.id });
        await isResRoomIdValid(req.params.id);
        const [data, error] = await Charge.deleteChargesByResRoomId({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
