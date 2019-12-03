const router = require('express').Router();
const RoomType = require('../models/room_type');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', async (req, res) => {
    try {
        const data = await RoomType.getAllRoomTypes();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await RoomType.getRoomTypeById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/availability/:date', async (req, res) => {
    try {
        const data = await RoomType.getRoomTypeAvailability(req.params.date);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        type: req.body.type,
        rate: req.body.rate,
    };
    try {
        const data = await RoomType.addNewRoomType(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
    const paramsObj = {
        room_type_id: req.body.room_type_id,
        type: req.body.type,
        rate: req.body.rate,
    };
    try {
        const data = await RoomType.updateRoomTypeById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await RoomType.deleteRoomTypeById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
