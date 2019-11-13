const router = require('express').Router();
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const ResRoom = require('../models/res_room');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/reservations route root!');
});

router.post('/', (req, res) => {
    const custParamsObj = {
        first_name: req.body.cust.first_name,
        last_name: req.body.cust.last_name,
        address: req.body.cust.address,
        city: req.body.cust.city,
        state: req.body.cust.state,
        zip: req.body.cust.zip,
        email: req.body.cust.email,
        phone: req.body.cust.phone,
        credit_card_num: req.body.cust.credit_card_num,
        cc_expiration: req.body.cust.cc_expiration,
    };
    Customer.addNewCustomer(custParamsObj, (data1) => {
        if (data1.insertId) {
            const resParamsObj = {
                customer_id: data1.insertId,
                user_id: req.body.reserve.user_id,
                comments: req.body.reserve.comments,
            };
            Reservation.addNewReservation(resParamsObj, (data2) => {
                if (data2.insertId) {
                    const paramsArr = req.body.rooms.map((resRoom, i) => ({
                        reservation_id: data2.insertId,
                        room_type_id: resRoom.room_type_id,
                        check_in_date: resRoom.check_in_date,
                        check_out_date: resRoom.check_out_date,
                        adults: resRoom.adults,
                        rate: resRoom.rate,
                        confirmation_code: new Date().getFullYear().toString().substr(2) + data2.insertId.toString().slice(-3) + ('00' + (i + 1)).slice(-3),
                        comments: resRoom.comments,
                    }));
                    ResRoom.addSomeResRooms(paramsArr, () => {
                        res.status(200).send({ reservation_id: data2.insertId });
                    });
                } else {
                    res.status(400).send('Could not add reservation... please check your request and try again!');
                }
            });
        } else {
            res.status(400).send('Could not add customer (and thus, the reservation)... please check your request and try again!');
        }
    });
});

module.exports = router;

/*
const obj =
{
    "cust": {
        "first_name": "Peter",
        "last_name": "Pan",
        "address": "1111 FairyTale Lane",
        "city": "Fantasyland",
        "state": "Vermont",
        "zip": "23456",
        "email": "p.pan@yahoo.net",
        "phone": "800-555-1212",
        "credit_card_num": "1234567890123456",
        "cc_expiration": "11 / 21"
    },
    "reserve": {
        "user_id": 1,
        "comments": "test reservation comment"
    },
    "rooms": [
        {
            "room_type_id": 2,
            "check_in_date": "2019-08-12",
            "check_out_date": "2019-08-15",
            "adults": 2,
            "rate": "119.99",
            "comments": "need a good view"
        },
        {
            "room_type_id": 1,
            "check_in_date": "2019-08-12",
            "check_out_date": "2019-08-17",
            "adults": 2,
            "rate": "109.99",
            "comments": "want a late checkout"
        }
    ]
};
*/
