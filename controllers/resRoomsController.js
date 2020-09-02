const router = require('express').Router();
const ResRoom = require('../models/resRoom');
const { postError, putError, deleteError } = require('./utils/errorMessages');

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
        const [data, error] = await ResRoom.addSomeResRooms(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const [data, error] = await ResRoom.deleteResRoomByResRoomId({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
