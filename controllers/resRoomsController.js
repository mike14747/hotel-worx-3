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

// this route will need to be sent data like this: { "vals": [[2, "2019-08-12", "2019-08-15", 2, "20190621HW000001", "need a good view"]] }
// reservation_id, room_type_id, check_in_date, check_out_date, adults, rate, confirmation_code, comments
router.post('/res_rooms', (req, res) => {
    ResRoom.insertSome(req.body.vals, (result) => {
        res.json({ result });
    });
});

module.exports = router;
