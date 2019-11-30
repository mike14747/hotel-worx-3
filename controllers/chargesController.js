const router = require('express').Router();
const Charge = require('../models/charge');

// all these routes point to /api/charges as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/charges route root!');
});

router.get('/id/:id', async (req, res) => {
    try {
        const data = await Charge.getChargeById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.get('/res-room/id/:id', async (req, res) => {
    try {
        const data = await Charge.getChargesByResRoomId(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
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
        res.status(400).send('Request failed... please check your request and try again!');
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
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Charge.deleteChargeById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.delete('/res-room/:id', async (req, res) => {
    try {
        const data = await Charge.deleteChargesByResRoomId(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
