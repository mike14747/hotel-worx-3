const router = require('express').Router();
const Charge = require('../models/charge');
const { chargeTypeExists, resRoomExists, chargeExists } = require('./utils/chargesValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Charge.getAllCharges();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.getChargeById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/res-rooms/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.getChargesByResRoomId({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const errorArray = [];
        const [doesResRoomExist, resRoomErrorMsg] = await resRoomExists(req.body.res_room_id);
        if (!doesResRoomExist) errorArray.push(resRoomErrorMsg);
        const [doesChargeTypeExist, chargeTypeErrorMsg] = await chargeTypeExists(req.body.charge_type_id);
        if (!doesChargeTypeExist) errorArray.push(chargeTypeErrorMsg);
        if (isNaN(parseFloat(req.body.charge_amount))) errorArray.push('charge_amount is not in a valid dollar amount');
        if (!/^[0-1]$/.test(req.body.taxable)) errorArray.push('taxable parameter is a boolean and should be 0 or 1');
        if (errorArray.length > 0) {
            return res.status(400).json({
                message: 'Errors exist in the transmitted request body.',
                errorList: errorArray,
            });
        }
        const paramsObj = {
            res_room_id: parseInt(req.body.res_room_id),
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_amount: parseFloat(req.body.charge_amount),
            taxable: parseInt(req.body.taxable),
        };
        const [data, error] = await Charge.addNewCharge(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const errorArray = [];
        const [doesChargeExist, chargeErrorMsg] = await chargeTypeExists(req.body.charge_id);
        if (!doesChargeExist) errorArray.push(chargeErrorMsg);
        const [doesChargeTypeExist, chargeTypeErrorMsg] = await chargeTypeExists(req.body.charge_type_id);
        if (!doesChargeTypeExist) errorArray.push(chargeTypeErrorMsg);
        if (isNaN(parseFloat(req.body.charge_amount))) errorArray.push('charge_amount is not in a valid dollar amount');
        if (!/^[0-1]$/.test(req.body.taxable)) errorArray.push('taxable parameter is a boolean and should be 0 or 1');
        if (errorArray.length > 0) {
            return res.status(400).json({
                message: 'Errors exist in the transmitted request body.',
                errorList: errorArray,
            });
        }
        const paramsObj = {
            charge_id: parseInt(req.body.charge_id),
            charge_type_id: parseInt(req.body.charge_type_id),
            charge_amount: parseFloat(req.body.charge_amount),
            taxable: parseInt(req.body.taxable),
        };
        const [data, error] = await Charge.updateChargeById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.deleteChargeById({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No charges were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

router.delete('/res-rooms/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Charge.deleteChargesByResRoomId({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No charges for res_rooms were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
