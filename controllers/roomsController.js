const router = require('express').Router();
const Room = require('../models/room');

// all these routes point to /api/rooms as specified in server.js and controllers/index.js

router.get('/', async (req, res) => {
    try {
        const data = await Room.getAllRooms();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Room.getRoomById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/all-ids-nums', async (req, res) => {
    try {
        const data = await Room.getAllRoomIdsNums();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/house-status', async (req, res) => {
    try {
        const data = await Room.getRoomsHouseStatus();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/housekeeping-status', async (req, res) => {
    const baseObj = {
        active: 1,
        inactive: 0,
        clean: 1,
        dirty: 1,
        occupied: 1,
        vacant: 1,
        arrived: 0,
        departed: 0,
        stayover: 0,
        dueout: 0,
        notreserved: 0,
    };
    const paramsObj = { ...baseObj, ...req.query };
    paramsObj.active2 = Number(paramsObj.inactive) === 1 ? 0 : 1;
    paramsObj.clean2 = Number(paramsObj.dirty) === 1 ? 0 : 1;
    paramsObj.occupied2 = Number(paramsObj.vacant) === 1 ? 0 : 1;
    const conditionsArray = [];
    Number(paramsObj.arrived) === 1 && conditionsArray.push('(rr.checked_in=1 && rr.check_in_date=CURDATE() && rr.checked_out=0)');
    Number(paramsObj.departed) === 1 && conditionsArray.push('(rr.check_out_date=CURDATE() && rr.checked_out=1)');
    Number(paramsObj.stayover) === 1 && conditionsArray.push('(CURDATE()>rr.check_in_date && CURDATE()<rr.check_out_date)');
    Number(paramsObj.dueout) === 1 && conditionsArray.push('(rr.check_out_date=CURDATE() && rr.checked_out=0)');
    Number(paramsObj.notreserved) === 1 && conditionsArray.push('(rr.check_in_date IS NULL || (CURDATE() NOT BETWEEN rr.check_in_date AND rr.check_out_date))');
    if (conditionsArray.length > 0) {
        paramsObj.extraConditions = ' && (' + conditionsArray.join(' || ') + ')';
    } else {
        paramsObj.extraConditions = '';
    }
    try {
        const data = await Room.getRoomsHousekeepingStatus(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/available-list/:date', async (req, res) => {
    try {
        const data = await Room.getAvailableRoomListByDate(req.params.date);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        room_num: req.body.room_num,
        room_type_id: req.body.room_type_id,
        description: req.body.description,
        num_beds: req.body.num_beds,
        clean: req.body.clean,
        occupied: req.body.occupied,
        active: req.body.active,
    };
    try {
        const data = await Room.addNewRoom(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
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
    try {
        const data = await Room.updateRoomById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/clean-status', async (req, res) => {
    const paramsObj = {
        room_id: req.body.room_id,
        clean: req.body.clean,
    };
    try {
        const data = await Room.updateRoomCleanById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/occupied-status', async (req, res) => {
    const paramsObj = {
        room_id: req.body.room_id,
        occupied: req.body.occupied,
    };
    try {
        const data = await Room.updateRoomOccupiedById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/checked-out/:id', async (req, res) => {
    try {
        const data = await Room.updateRoomCheckedOutById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Room.deleteRoomById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
