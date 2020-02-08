const router = require('express').Router();
const RoomType = require('../models/room_type');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await RoomType.getAllRoomTypes();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await RoomType.getRoomTypeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/availability/:date', async (req, res, next) => {
    try {
        const data = await RoomType.getRoomTypeAvailability({ date: req.params.date });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        type: req.body.type,
        rate: req.body.rate,
    };
    try {
        const data = await RoomType.addNewRoomType(paramsObj);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        room_type_id: req.body.room_type_id,
        type: req.body.type,
        rate: req.body.rate,
    };
    try {
        const data = await RoomType.updateRoomTypeById(paramsObj);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await RoomType.deleteRoomTypeById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
