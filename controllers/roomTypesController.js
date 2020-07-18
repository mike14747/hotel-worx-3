const router = require('express').Router();
const RoomType = require('../models/roomType');
const { isRoomTypeValid } = require('./validation/roomTypesValidation');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await RoomType.getAllRoomTypes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await RoomType.getRoomTypeById({ id: parseInt(req.params.id) });
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
    try {
        const paramsObj = {
            room_type: req.body.room_type,
            room_rate: parseFloat(req.body.room_rate),
        };
        const [result, errorObj] = await isRoomTypeValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await RoomType.addNewRoomType(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        if (!idRegEx.test(req.body.room_type_id)) return res.status(400).json(idErrorObj);
        const paramsObj = {
            room_type_id: req.body.room_type_id,
            room_type: req.body.room_type,
            room_rate: parseFloat(req.body.room_rate),
        };
        const [result, errorObj] = await isRoomTypeValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await RoomType.updateRoomTypeById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await RoomType.deleteRoomTypeById({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
