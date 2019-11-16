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
                        resRoomsArr[i].confirmation_code = today.getFullYear().toString().substr(2) + (today.getMonth() + 1).toString() + today.getDate().toString() + data2.insertId.toString().slice(-3) + ('00' + (i + 1)).slice(-3);
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

module.exports = router;
