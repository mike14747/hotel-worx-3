const router = require('express').Router();
const ChargeType = require('../models/charge_type');

// all these routes point to /api/charge-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/charge-types route root!');
});

router.get('/id/:id', async (req, res) => {
    try {
        const data = await ChargeType.getChargeTypeById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.get('/all', async (req, res) => {
    try {
        const data = await ChargeType.getAllChargeTypes();
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        charge_type: req.body.charge_type,
    };
    try {
        const data = await ChargeType.addNewChargeType(paramsObj);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
    const paramsObj = {
        charge_type_id: req.body.charge_type_id,
        charge_type: req.body.charge_type,
        active: req.body.active,
    };
    try {
        const data = await ChargeType.updateChargeTypeById(paramsObj);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await ChargeType.deleteChargeTypeById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(400).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
