const router = require('express').Router();
const Reservation = require('../models/reservation');
const ResRoom = require('../models/res_room');

// all these routes point to /api/reservations as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await Reservation.getAllReservations();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Reservation.getReservationById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/res-rooms', async (req, res, next) => {
    try {
        const data = await ResRoom.getResRoomsByReservationId({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        customerObj: req.body.customerObj,
        reservationObj: req.body.reservationObj,
        resRoomsArr: req.body.resRoomsArr,
    };
    try {
        const data = await Reservation.addNewReservation(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        reservation_id: req.body.reservation_id,
        customer_id: req.body.customer_id,
        user_id: req.body.user_id,
        company_id: req.body.company_id,
        comments: req.body.comments,
        active: req.body.active,
    };
    try {
        const data = await Reservation.updateReservationById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

// this route was changed to implement "data[0] ? res.json(data[0]) : next(data[1]);", but it hasn't been tested
router.put('/res-rooms/assign', async (req, res, next) => {
    const baseConfirmationCode = req.body.confirmation_code.slice(0, -3);
    try {
        const maxCode = await ResRoom.getMaxCCodeByReservationId(req.body.reservation_id);
        let newConfirmationCode;
        if (maxCode[0].totalRooms === 1 || maxCode[0].numAssignedRooms === 0) {
            newConfirmationCode = req.body.confirmation_code;
        } else {
            newConfirmationCode = baseConfirmationCode + ('00' + (maxCode[0].currentMaxCCode + 1).toString()).slice(-3);
        }
        const paramsObj = {
            res_room_id: req.body.res_room_id,
            room_type_id: req.body.room_type_id,
            room_id: req.body.room_id,
            rate: req.body.rate,
            confirmation_code: newConfirmationCode,
        };
        const data = await ResRoom.updateResRoomAssignById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms/reassign', async (req, res, next) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        room_type_id: req.body.room_type_id,
        room_id: req.body.room_id,
        rate: req.body.rate,
    };
    try {
        const data = await ResRoom.updateResRoomReassignById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms', async (req, res, next) => {
    const paramsObj = {
        room_type_id: req.body.room_type_id,
        check_in_date: req.body.check_in_date,
        check_out_date: req.body.check_out_date,
        adults: req.body.adults,
        rate: req.body.rate,
        comments: req.body.comments,
        allow_charges: req.body.allow_charges,
        res_room_id: req.body.res_room_id,
    };
    try {
        const data = await ResRoom.updateResRoomInfoById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms/:id/check-in', async (req, res, next) => {
    try {
        const data = await ResRoom.updateResRoomCheckinById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms/:id/check-out', async (req, res, next) => {
    try {
        const data = await ResRoom.updateResRoomCheckoutById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
