const router = require('express').Router();
const RoomType = require('../models/roomType');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { roomTypesSchema, roomTypeIdSchema, roomTypeDateSchema } = require('./validation/schema/roomTypesSchema');
const isRoomTypeIdValid = require('./validation/helpers/isRoomTypeIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await RoomType.getAllRoomTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await roomTypeIdSchema.validateAsync({ room_type_id: req.params.id });
        const [data, error] = await RoomType.getRoomTypeById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/availability/:date', async (req, res, next) => {
    try {
        await roomTypeDateSchema.validateAsync({ dateCheck1: req.params.date, dateCheck2: req.params.date });
        const [data, error] = await RoomType.getRoomTypeAvailability({ date: req.params.date });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            room_type: req.body.room_type,
            room_rate: parseFloat(req.body.room_rate),
        };
        await roomTypesSchema.validateAsync(paramsObj);
        const [data, error] = await RoomType.addNewRoomType(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            room_type_id: req.body.room_type_id,
            room_type: req.body.room_type,
            room_rate: parseFloat(req.body.room_rate),
        };
        await roomTypesSchema.validateAsync(paramsObj);
        await roomTypeIdSchema.validateAsync({ room_type_id: req.body.room_type_id });
        await isRoomTypeIdValid(paramsObj.room_type_id);
        const [data, error] = await RoomType.updateRoomTypeById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await roomTypeIdSchema.validateAsync({ room_type_id: req.params.id });
        await isRoomTypeIdValid(req.params.id);
        const [data, error] = await RoomType.deleteRoomTypeById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
