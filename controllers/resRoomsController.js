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
            room_rate: req.body.room_rate,
            confirmation_code: newConfirmationCode,
        };
        const [data, error] = await ResRoom.updateResRoomAssignById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms/reassign', async (req, res, next) => {
    const paramsObj = {
        res_room_id: req.body.res_room_id,
        room_type_id: req.body.room_type_id,
        room_id: req.body.room_id,
        room_rate: req.body.room_rate,
    };
    try {
        const [data, error] = await ResRoom.updateResRoomReassignById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
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
        room_rate: req.body.room_rate,
        comments: req.body.comments,
        allow_charges: req.body.allow_charges,
        res_room_id: req.body.res_room_id,
    };
    try {
        const [data, error] = await ResRoom.updateResRoomInfoById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms/:id/check-in', async (req, res, next) => {
    try {
        const [data, error] = await ResRoom.updateResRoomCheckinById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.put('/res-rooms/:id/check-out', async (req, res, next) => {
    try {
        const [data, error] = await ResRoom.updateResRoomCheckoutById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
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
