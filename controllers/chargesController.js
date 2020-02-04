const router = require('express').Router();
const Charge = require('../models/charge');

// all these routes point to /api/charges as specified in server.js and controllers/index.js

router.get('/', async (req, res) => {
    try {
        const data = await Charge.getAllCharges();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Charge.getChargeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed.. please check your request and try again!');
    }
});

router.get('/res-rooms/:id', async (req, res) => {
    try {
        const data = await Charge.getChargesByResRoomId({ id: Number(req.params.id) });
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        charge_type_id: req.body.charge_type_id,
        charge_amount: req.body.charge_amount,
        taxable: req.body.taxable,
    };
    try {
        const data = await Charge.addNewCharge(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
    const paramsObj = {
        charge_id: req.body.charge_id,
        charge_type_id: req.body.charge_type_id,
        charge_amount: req.body.charge_amount,
        taxable: req.body.taxable,
    };
    try {
        const data = await Charge.updateChargeById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Charge.deleteChargeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/res-rooms/:id', async (req, res) => {
    try {
        const data = await Charge.deleteChargesByResRoomId({ id: Number(req.params.id) });
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
