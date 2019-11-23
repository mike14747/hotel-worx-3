const router = require('express').Router();
const Charge = require('../models/charge');

// all these routes point to /api/charges as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/charges route root!');
});

router.get('/id/:id', (req, res) => {
    Charge.getChargesById(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/res-room/id/:id', (req, res) => {
    Charge.getChargesByResRoomId(req.params.id, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        charge_type_id: req.body.charge_type_id,
        charge_amount: req.body.charge_amount,
    };
    Charge.addNewCharge(paramsObj, (data) => {
        console.log(data);
        if (data.insertId) {
            res.status(200).send('Charge was successfully added!');
        } else {
            res.status(400).send('Could not add charge... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
    const paramsObj = {
        charge_id: req.body.charge_id,
        charge_type_id: req.body.charge_type_id,
        charge_amount: req.body.charge_amount,
    };
    Charge.updateChargeById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Charge was successfully updated!');
        } else {
            res.status(400).send('Could not update charge... please check your request and try again!');
        }
    });
});

router.delete('/id/:id', (req, res) => {
    Charge.deleteChargeById(req.params.id, (data) => {
        res.json(data);
    });
});

// updateChargeById

router.delete('/res-room/id/:id', (req, res) => {
    Charge.deleteChargesByResRoomId(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;
