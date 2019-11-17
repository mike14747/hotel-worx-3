const router = require('express').Router();
const Room = require('../models/room');

// all these routes point to /api/rooms as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/rooms route root!');
});

router.get('/all', (req, res) => {
    Room.getAllRooms((data) => {
        res.json(data);
    });
});

router.get('/id/:id', (req, res) => {
    Room.getRoomById(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/all-ids-nums', (req, res) => {
    Room.getAllRoomIdsNums((data) => {
        res.json(data);
    });
});

router.get('/house-status', (req, res) => {
    Room.getRoomsHouseStatus((data) => {
        res.json(data);
    });
});

router.get('/housekeeping-status', (req, res) => {
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
    Room.getRoomsHousekeepingStatus(paramsObj, (data) => {
        res.json(data);
    });
});

router.get('/available-list/:date', (req, res) => {
    Room.getAvailableRoomListByDate(req.params.date, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = {
        room_num: req.body.room_num,
        room_type_id: req.body.room_type_id,
        description: req.body.description,
        num_beds: req.body.num_beds,
        clean: req.body.clean,
        occupied: req.body.occupied,
        active: req.body.active,
    };
    Room.addNewRoom(paramsObj, (data) => {
        if (data.insertId) {
            res.status(200).send('New room was successfully added!');
        } else {
            res.status(400).send('Could not add the new room... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
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
    Room.updateRoomById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Room info was successfully updated!');
        } else {
            res.status(400).send('Could not update room info... please check your request and try again!');
        }
    });
});

router.put('/clean-status', (req, res) => {
    const paramsObj = {
        room_id: req.body.room_id,
        clean: req.body.clean,
    };
    Room.updateRoomCleanById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Room clean status was successfully updated!');
        } else {
            res.status(400).send('Could not update room clean status... please check your request and try again!');
        }
    });
});

router.put('/occupied-status', (req, res) => {
    const paramsObj = {
        room_id: req.body.room_id,
        occupied: req.body.occupied,
    };
    Room.updateRoomOccupiedById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Room occupied status was successfully updated!');
        } else {
            res.status(400).send('Could not update room occupied status... please check your request and try again!');
        }
    });
});

router.put('/checked-out/:id', (req, res) => {
    Room.updateRoomCheckedOutById(req.params.id, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Room checked-out status was successfully updated!');
        } else {
            res.status(400).send('Could not update room checked-out status... please check your request and try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    Room.deleteRoomById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Room was successfully deleted!');
        } else {
            res.status(400).send('Room could not be deleted... please check your request and try again!');
        }
    });
});

module.exports = router;