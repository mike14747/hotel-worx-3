const router = require('express').Router();
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const ResRoom = require('../models/res_room');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/reservations route root!');
});

router.get('/all', (req, res) => {
    Reservation.getAllReservations((data) => {
        res.json(data);
    });
});

router.get('/id/:id', (req, res) => {
    Reservation.getReservationById(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/res-rooms/id/:id', (req, res) => {
    ResRoom.getResRoomsByReservationId(req.params.id, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const { customerObj, reservationObj, resRoomsArr } = req.body;
    Customer.addNewCustomer(customerObj, (data1) => {
        if (data1.insertId) {
            reservationObj.customer_id = data1.insertId;
            Reservation.addNewReservation(reservationObj, (data2) => {
                if (data2.insertId) {
                    resRoomsArr.forEach((element, i) => {
                        resRoomsArr[i].reservation_id = data2.insertId;
                        const today = new Date();
                        // resRoomsArr[i].confirmation_code = today.getFullYear().toString().substr(2) + (today.getMonth() + 1).toString() + today.getDate().toString() + data2.insertId.toString().slice(-3) + ('00' + (i + 1)).slice(-3);
                        resRoomsArr[i].confirmation_code = today.getFullYear().toString().substr(2) + (today.getMonth() + 1).toString() + today.getDate().toString() + data2.insertId.toString().slice(-3) + '001';
                    });
                    ResRoom.addSomeResRooms(resRoomsArr, (data3) => {
                        if (data3.insertId) {
                            res.status(200).send({ reservation_id: data2.insertId });
                        } else {
                            res.status(400).send('Could not add rooms associated with the reservation... please check your request and try again!');
                        }
                    });
                } else {
                    res.status(400).send('Could not add reservation (and thus, the rooms asscociated with the reservation)... please check your request and try again!');
                }
            });
        } else {
            res.status(400).send('Could not add customer (and thus, the reservation)... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
    const paramsObj = {
        reservation_id: req.body.reservation_id,
        customer_id: req.body.customer_id,
        company_id: req.body.company_id,
        comments: req.body.comments,
        active: req.body.active,
    };
    Reservation.updateReservationById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Reservation was successfully updated!');
        } else {
            res.status(400).send('Could not update reservation... please check your request and try again!');
        }
    });
});

router.put('/res-rooms/assign', (req, res) => {
    const baseConfirmationCode = req.body.confirmation_code.slice(0, -3);
    ResRoom.getMaxCCodeByReservationId(req.body.reservation_id, (data1) => {
        let newConfirmationCode;
        if (data1[0].totalRooms === 1 || data1[0].numAssignedRooms === 0) {
            newConfirmationCode = req.body.confirmation_code;
        } else {
            newConfirmationCode = baseConfirmationCode + ('00' + (data1[0].currentMaxCCode + 1).toString()).slice(-3);
        }
        const paramsObj = {
            res_room_id: req.body.res_room_id,
            room_type_id: req.body.room_type_id,
            room_id: req.body.room_id,
            rate: req.body.rate,
            confirmation_code: newConfirmationCode,
        };
        ResRoom.updateResRoomAssignById(paramsObj, (data2) => {
            if (data2.changedRows > 0) {
                res.status(200).send('Res_room was successfully updated!');
            } else {
                res.status(400).send('Could not update res_room... please check your request and try again!');
            }
        });
    });
});

router.put('/res-rooms/reassign', (req, res) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        room_type_id: req.body.room_type_id,
        room_id: req.body.room_id,
        rate: req.body.rate,
    };
    ResRoom.updateResRoomReassignById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Res_room was successfully updated!');
        } else {
            res.status(400).send('Could not update res_room... please check your request and try again!');
        }
    });
});

router.put('/res-rooms/info', (req, res) => {
    const paramsObj = {
        room_type_id: req.body.room_type_id,
        check_in_date: req.body.check_in_date,
        check_out_date: req.body.check_out_date,
        adults: req.body.adults,
        rate: req.body.rate,
        comments: req.body.comments,
        res_room_id: req.body.res_room_id,
    };
    ResRoom.updateResRoomInfoById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Res_room was successfully updated!');
        } else {
            res.status(400).send('Could not update res_room... please check your request and try again!');
        }
    });
});

router.put('/res-rooms/check-in/:id', (req, res) => {
    ResRoom.updateResRoomCheckinById(req.params.id, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Res_room was successfully updated!');
        } else {
            res.status(400).send('Could not update res_room... please check your request and try again!');
        }
    });
});

router.put('/res-rooms/check-out/:id', (req, res) => {
    ResRoom.updateResRoomCheckoutById(req.params.id, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Res_room was successfully updated!');
        } else {
            res.status(400).send('Could not update res_room... please check your request and try again!');
        }
    });
});

module.exports = router;
