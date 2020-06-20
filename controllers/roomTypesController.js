const router = require('express').Router();
const RoomType = require('../models/room_type');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await RoomType.getAllRoomTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await RoomType.getRoomTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

// this route needs some tinkering to implement "data ? res.json(data) : next(error);"
// this route was changed to implement "data ? res.json(data) : next(error);", but it hasn't been tested
router.get('/availability/:date', async (req, res, next) => {
    // /^[0-9]{4}-(([0]{1}[0-9]{1})|([1]{1}[0-2]{1}))-(([0-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$/g
    try {
        const [data, error] = await RoomType.getRoomTypeAvailability({ date: req.params.date });
        data ? res.json(data) : next(error);
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
        const [data, error] = await RoomType.addNewRoomType(paramsObj);
        data ? res.json(data) : next(error);
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
        const [data, error] = await RoomType.updateRoomTypeById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await RoomType.deleteRoomTypeById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
