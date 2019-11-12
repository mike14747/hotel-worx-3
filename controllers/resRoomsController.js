const router = require('express').Router();
const ResRoom = require('../models/res_room');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/res-rooms route root!');
});

router.get('/all', (req, res) => {
    ResRoom.getResRoomById((data) => {
        res.json(data);
    });
});

router.get('/id/:id', (req, res) => {
    ResRoom.getResRoomById(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;
