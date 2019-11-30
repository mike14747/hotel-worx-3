const router = require('express').Router();
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const ResRoom = require('../models/res_room');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/reservations route root!');
});

router.get('/all', async (req, res) => {
    try {
        const data = await Reservation.getAllReservations();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const data = await Reservation.getReservationById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/res-rooms/id/:id', async (req, res) => {
    try {
        const data = await ResRoom.getResRoomsByReservationId(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/test', async (req, res) => {
    const { resRoomsArr } = req.body;
    try {
        const data = await ResRoom.addSomeResRooms(resRoomsArr);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const { customerObj, reservationObj, resRoomsArr } = req.body;
    try {
        const newCustomer = await Customer.addNewCustomer(customerObj);
        reservationObj.customer_id = newCustomer.insertId;
        const data = await Reservation.addNewReservation(reservationObj);
        resRoomsArr.forEach((element, i) => {
            resRoomsArr[i].reservation_id = data.insertId;
            const today = new Date();
            resRoomsArr[i].confirmation_code = today.getFullYear().toString().substr(2) + (today.getMonth() + 1).toString() + today.getDate().toString() + data.insertId.toString().slice(-3) + '001';
        });
        await ResRoom.addSomeResRooms(resRoomsArr);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
    const paramsObj = {
        reservation_id: req.body.reservation_id,
        customer_id: req.body.customer_id,
        company_id: req.body.company_id,
        comments: req.body.comments,
        active: req.body.active,
    };
    try {
        const data = await Reservation.updateReservationById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/res-rooms/assign', async (req, res) => {
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
        const assignedRoom = await ResRoom.updateResRoomAssignById(paramsObj);
        res.json(assignedRoom);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/res-rooms/reassign', async (req, res) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        room_type_id: req.body.room_type_id,
        room_id: req.body.room_id,
        rate: req.body.rate,
    };
    try {
        const data = await ResRoom.updateResRoomReassignById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/res-rooms/info', async (req, res) => {
    const paramsObj = {
        room_type_id: req.body.room_type_id,
        check_in_date: req.body.check_in_date,
        check_out_date: req.body.check_out_date,
        adults: req.body.adults,
        rate: req.body.rate,
        comments: req.body.comments,
        res_room_id: req.body.res_room_id,
    };
    try {
        const data = await ResRoom.updateResRoomInfoById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/res-rooms/check-in', async (req, res) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        checked_in: req.body.checked_in,
    };
    try {
        const data = await ResRoom.updateResRoomCheckinById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/res-rooms/check-out', async (req, res) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        checked_out: req.body.checked_out,
    };
    try {
        const data = await ResRoom.updateResRoomCheckoutById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
