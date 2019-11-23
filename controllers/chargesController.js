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

router.delete('/:id', (req, res) => {
    Charge.deleteChargeById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Charge was successfully deleted!');
        } else {
            res.status(400).send('Could not delete charge... please check your request and try again!');
        }
    });
});

// updateChargeById

router.delete('/res-room/:id', (req, res) => {
    Charge.deleteChargesByResRoomId(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Charges were successfully deleted!');
        } else {
            res.status(400).send('Could not delete charges... please check your request and try again!');
        }
    });
});

module.exports = router;
