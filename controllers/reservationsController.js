const router = require('express').Router();
const Reservation = require('../models/reservation');
const ResRoom = require('../models/resRoom');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { reservationNewSchema, reservationUpdateSchema, reservationIdSchema } = require('./validation/schema/reservationsSchema');
const isReservationIdValid = require('./validation/helpers/isReservationIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Reservation.getAllReservations();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [data, error] = await Reservation.getReservationById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/res-rooms', async (req, res, next) => {
    try {
        const [data, error] = await ResRoom.getResRoomsByReservationId({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
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
        const [data, error] = await Reservation.addNewReservation(paramsObj);
        if (error) return next(error);
        data ? res.status(201).json(data) : res.status(400).json({ Error: postError });
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
        const [data, error] = await Reservation.updateReservationById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await reservationIdSchema.validateAsync({ reservation_id: req.params.id });
        await isReservationIdValid(req.params.id);
        const [data, error] = await Reservation.deleteReservationById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
