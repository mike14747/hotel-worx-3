const router = require('express').Router();
const RoomType = require('../models/room_type');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/room-types route root!');
});

router.get('/availability/:date', (req, res) => {
    RoomType.getRoomTypeAvailability((data) => {
        res.json(data);
    });
});

module.exports = router;
