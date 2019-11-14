const router = require('express').Router();
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const ResRoom = require('../models/res_room');

// all these routes point to /api/room-types as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/reservations route root!');
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

/*
const obj =
{
    "customerObj": {
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
    "reservationObj": {
        "user_id": 1,
        "comments": "test reservation comment"
    },
    "resRoomsArr": [
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
