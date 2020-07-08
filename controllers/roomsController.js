const router = require('express').Router();
const Room = require('../models/room');
const { housekeepingStatus } = require('./utils/roomsFunctions');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Room.getAllRooms();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/all-ids-nums', async (req, res, next) => {
    try {
        const [data, error] = await Room.getAllRoomIdsNums();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/house-status', async (req, res, next) => {
    try {
        const [data, error] = await Room.getRoomsHouseStatus();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/housekeeping-status', async (req, res, next) => {
    try {
        const paramsObj = housekeepingStatus(req.query);
        const [data, error] = await Room.getRoomsHousekeepingStatus(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/available-list/:date', async (req, res, next) => {
    if (!/^[0-9]{4}-(([0]{1}[0-9]{1})|([1]{1}[0-2]{1}))-(([0-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$/g.test(req.params.date)) return res.status(400).json({ message: 'The query parameter, date, is not in the proper format (YYYY-MM-DD)!' });
    try {
        const [data, error] = await Room.getAvailableRoomListByDate({ date: req.params.date });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Room.getRoomById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            room_num: req.body.room_num,
            room_type_id: req.body.room_type_id,
            description: req.body.description,
            num_beds: req.body.num_beds,
            clean: req.body.clean,
            occupied: req.body.occupied,
            active: req.body.active,
        };
        const [data, error] = await Room.addNewRoom(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            room_id: req.body.room_id,
            room_num: req.body.room_num,
            room_type_id: req.body.room_type_id,
            description: req.body.description,
            num_beds: req.body.num_beds,
            clean: req.body.clean,
            occupied: req.body.occupied,
            active: req.body.active,
        };
        const [data, error] = await Room.updateRoomById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/clean-status', async (req, res, next) => {
    try {
        const paramsObj = {
            room_id: req.body.room_id,
            clean: req.body.clean,
        };
        const [data, error] = await Room.updateRoomCleanById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/occupied-status', async (req, res, next) => {
    try {
        const paramsObj = {
            room_id: req.body.room_id,
            occupied: req.body.occupied,
        };
        const [data, error] = await Room.updateRoomOccupiedById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/:id/checked-out', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Room.updateRoomCheckedOutById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No rooms were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!/^[0-9]$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Room.deleteRoomById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No rooms were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
