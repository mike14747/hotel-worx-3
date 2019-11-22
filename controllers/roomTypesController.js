const router = require('express').Router();
const RoomType = require('../models/room_type');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/room-types route root!');
});

router.get('/all', (req, res) => {
    RoomType.getAllRoomTypes((data) => {
        res.json(data);
    });
});

router.get('/id/:id', (req, res) => {
    RoomType.getRoomTypeById(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/availability/:date', (req, res) => {
    RoomType.getRoomTypeAvailability(req.params.date, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = {
        type: req.body.type,
        rate: req.body.rate,
    };
    RoomType.addNewRoomType(paramsObj, (data) => {
        if (data.insertId) {
            res.status(200).send('Room type was successfully added!');
        } else {
            res.status(400).send('Could not add room type... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
    const paramsObj = {
        room_type_id: req.body.room_type_id,
        type: req.body.type,
        rate: req.body.rate,
    };
    RoomType.addNewRoomType(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Room type was successfully updated!');
        } else {
            res.status(400).send('Could not update room type... please check your request and try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    RoomType.deleteRoomTypeById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Room type was successfully deleted!');
        } else {
            res.status(400).send('Could not delete room type... please check your request and try again!');
        }
    });
});

module.exports = router;
