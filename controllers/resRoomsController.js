const router = require('express').Router();
const resRoom = require('../models/resRoom');
const { postError } = require('./utils/errorMessages');

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            resRooms: [
                {
                    reservation_id: req.body.reservation_id,
                    room_type_id: req.body.room_type_id,
                    check_in_date: req.body.check_in_date,
                    check_out_date: req.body.check_out_date,
                    adults: req.body.adults,
                    room_rate: req.body.room_rate,
                    confirmation_code: req.body.confirmation_code,
                    comments: req.body.comments,
                    allow_charges: req.body.allow_charges,
                },
            ],
        };
        const [data, error] = await resRoom.addSomeResRooms(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
