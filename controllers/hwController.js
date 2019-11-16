const router = require('express').Router();

const db = require('../models/index.js');

router.put('/reservation', (req, res) => {
    db.Customer.updateOne(req.body.cust, () => {
        db.Reservation.updateOne(req.body.reserve, () => {
            db.ResRoom.updateSome(req.body.rooms, (result) => {
                res.status(200).send(result);
            });
        });
    });
});

router.get('/reservations', (req, res) => {
    db.Reservation.selectAll((data) => {
        res.json(data);
    });
});

router.get('/reservations_list/:fname/:lname/:sdate/:edate/:cnum', (req, res) => {
    const conditions = [];
    req.params.fname !== 'undefined' && conditions.push('c.first_name LIKE "' + req.params.fname + '%"');
    req.params.lname !== 'undefined' && conditions.push('c.last_name LIKE "' + req.params.lname + '%"');
    req.params.sdate !== 'undefined' && conditions.push('(rr.check_in_date="' + req.params.sdate + '")');
    req.params.edate !== 'undefined' && conditions.push('(rr.check_out_date="' + req.params.edate + '")');
    req.params.cnum !== 'undefined' && conditions.push('rr.confirmation_code LIKE "%"' + req.params.cnum + '%"');
    conditions.length === 0 && conditions.push('(rr.check_in_date>=CURDATE())');
    db.Reservation.selectSome(conditions, (data) => {
        res.json(data);
    });
});

// to get info about a reservation, both of these 2 queries need to be returned
// this route gets a reservation by id with customer info
router.get('/reservation/:id', (req, res) => {
    db.Reservation.selectOne(req.params.id, (result) => {
        res.json(result);
    });
});
// this route gets all rooms associated with a reservation_id
router.get('/res_rooms/:id', (req, res) => {
    db.ResRoom.selectSome(req.params.id, (result) => {
        res.json(result);
    });
});

router.get('/arrivals/:sdate/:fname/:lname/:cnum', (req, res) => {
    const conditions = [];
    if (req.params.sdate !== 'undefined') {
        conditions.push('(rr.check_in_date="' + req.params.sdate + '")');
    }
    if (req.params.fname !== 'undefined') {
        conditions.push('c.first_name LIKE "' + req.params.fname + '%"');
    }
    if (req.params.lname !== 'undefined') {
        conditions.push('c.last_name LIKE "' + req.params.lname + '%"');
    }
    if (req.params.cnum !== 'undefined') {
        conditions.push('rr.confirmation_code LIKE "%' + req.params.cnum + '%"');
    }
    conditions.length === 0 && conditions.push('(rr.check_in_date=CURDATE())');
    db.ResRoom.selectArrivals(conditions, (result) => {
        res.json(result);
    });
});

router.get('/departures/:fname/:lname/:rnum/:sover/:dout/:dpart', (req, res) => {
    const conditions = [];
    req.params.fname !== 'undefined' && conditions.push('c.first_name LIKE "' + req.params.fname + '%"');
    req.params.lname !== 'undefined' && conditions.push('c.last_name LIKE "' + req.params.lname + '%"');
    req.params.rnum !== 'undefined' && conditions.push('(rm.room_num="' + req.params.rnum + '")');
    req.params.sover === 'true' && conditions.push('(rr.check_in_date<CURDATE() && rr.check_out_date>CURDATE())');
    req.params.dout === 'true' && conditions.push('(rr.check_out_date=CURDATE() && rr.checked_out=0)');
    req.params.dpart === 'true' && conditions.push('(rr.check_out_date=CURDATE() && rr.checked_out=1)');
    conditions.length === 0 && conditions.push('(rr.check_out_date=CURDATE() && rr.checked_out=0)');
    db.ResRoom.selectDepartures(conditions, (result) => {
        res.json(result);
    });
});

router.get('/rooms_arrivals/:date', (req, res) => {
    db.Room.selectAllShort(req.params.date, (result) => {
        res.json(result);
    });
});

router.get('/pending_departures/:date', (req, res) => {
    db.ResRoom.countPendingDeparturesByRoomType(req.params.date, (result) => {
        res.json(result);
    });
});

router.get('/guests/:fname/:lname/:rnum/:cnum', (req, res) => {
    const conditions = [];
    if (req.params.fname !== 'undefined') {
        conditions.push('c.first_name LIKE "' + req.params.fname + '%"');
    }
    if (req.params.lname !== 'undefined') {
        conditions.push('c.last_name LIKE "' + req.params.lname + '%"');
    }
    if (req.params.rnum !== 'undefined') {
        conditions.push('rm.room_num LIKE "%' + req.params.rnum + '%"');
    }
    if (req.params.cnum !== 'undefined') {
        conditions.push('rr.confirmation_code LIKE "%' + req.params.cnum + '%"');
    }
    conditions.length === 0 && conditions.push('(rm.occupied=1)');
    db.ResRoom.getGuests(conditions, (result) => {
        res.json(result);
    });
});

// this route will need to be sent data like this: { "vals": [[2, "2019-08-12", "2019-08-15", 2, "20190621HW000001", "need a good view"]] }
router.post('/res_rooms', (req, res) => {
    db.ResRoom.insertSome(req.body.vals, (result) => {
        res.json({ result });
    });
});

router.put('/cancelReservation/:id', (req, res) => {
    db.Reservation.cancelOne(req.params.id, () => {
        db.ResRoom.cancelSome(req.params.id, (data) => {
            res.json(data);
        });
    });
});

router.put('/checkinRoom/:id/:room_id', (req, res) => {
    const vals = [req.params.room_id, req.params.id];
    const cond = [1, req.params.room_id];
    db.ResRoom.updateCheckIn(vals, () => {
        db.Room.updateOccupied(cond, (result) => {
            res.json(result);
        });
    });
});

router.put('/checkoutRoom/:id/:room_num', (req, res) => {
    db.ResRoom.updateCheckOut(req.params.id, () => {
        db.Room.updateCheckOut(req.params.room_num, (result) => {
            res.json(result);
        });
    });
});

router.post('/invoice', (req, res) => {
    db.ResRoom.selectForInvoice(req.body.id, (result) => {
        const roomTotal = (parseFloat(result[0].rate) * parseFloat(result[0].num_days)).toFixed(2);
        const countyTax = parseFloat(result[0].county_rate * roomTotal).toFixed(2);
        const cityTax = parseFloat(result[0].city_rate * roomTotal).toFixed(2);
        const stateTax = parseFloat(result[0].state_rate * roomTotal).toFixed(2);
        const paymentType = req.body.paymentType;
        const vals = [result[0].res_room_id, result[0].num_days, result[0].rate, countyTax, cityTax, stateTax, paymentType];
        db.Invoice.insertOne(vals, (result) => {
            res.json(result.insertId);
        });
    });
});

router.get('/preInvoice/:id', (req, res) => {
    db.ResRoom.selectForPreInvoice(req.params.id, (result) => {
        const roomTotal = (parseFloat(result[0].rate) * parseFloat(result[0].num_days)).toFixed(2);
        const countyTax = parseFloat(result[0].county_rate * roomTotal).toFixed(2);
        const cityTax = parseFloat(result[0].city_rate * roomTotal).toFixed(2);
        const stateTax = parseFloat(result[0].state_rate * roomTotal).toFixed(2);
        const preInvoice = [{ first_name: result[0].first_name, last_name: result[0].last_name, ccLastFour: result[0].ccLastFour, check_in_date: result[0].check_in_date, check_out_date: result[0].check_out_date, res_room_id: result[0].res_room_id, num_days: result[0].num_days, rate: result[0].rate, countyTax: countyTax, cityTax: cityTax, stateTax: stateTax, paymentType: '' }];
        res.json(preInvoice);
    });
});

router.get('/invoice/:id', (req, res) => {
    db.Invoice.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/invoice_id/:id', (req, res) => {
    db.Invoice.selectOneId(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/tax_rates', (req, res) => {
    db.TaxRate.selectRates((data) => {
        res.json(data);
    });
});

router.get('/hotel_info/:id', (req, res) => {
    db.HotelInfo.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

router.get('/room_issues', (req, res) => {
    db.RoomIssue.selectAll((data) => {
        res.json(data);
    });
});

router.put('/room_issues/:id', (req, res) => {
    db.RoomIssue.updateOne(req.body.vals, req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

router.put('/room_issues_fixed/:id', (req, res) => {
    db.RoomIssue.updateOneFixed(req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

router.post('/room_issues', (req, res) => {
    db.RoomIssue.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

router.get('/house_status_res_rooms/:date', (req, res) => {
    db.ResRoom.selectForHouseStatus(req.params.date, (data) => {
        res.json(data);
    });
});

router.get('/house_status_rooms', (req, res) => {
    db.Room.selectForHouseStatus((data) => {
        res.json(data);
    });
});

module.exports = router;
