const router = require('express').Router();
const AccessLevel = require('../models/accessLevel');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { accessLevelsSchema, accessIdSchema } = require('./validation/schema/accessLevelsSchema');
const isAccessIdValid = require('./validation/helpers/isAccesIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await AccessLevel.getAllAccessLevels();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await accessIdSchema.validateAsync({ access_id: req.params.id });
        const [data, error] = await AccessLevel.getAccessLevelById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            access_level: parseInt(req.body.access_level),
            access_type: req.body.access_type,
        };
        await accessLevelsSchema.validateAsync(paramsObj);
        const [data, error] = await AccessLevel.addNewAccessLevel(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            access_id: parseInt(req.body.access_id),
            access_level: parseInt(req.body.access_level),
            access_type: req.body.access_type,
        };
        await accessLevelsSchema.validateAsync(paramsObj);
        await isAccessIdValid(paramsObj.access_id);
        const [data, error] = await AccessLevel.updateAccessLevel(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await accessIdSchema.validateAsync({ access_id: req.params.id });
        await isAccessIdValid(req.params.id);
        const [data, error] = await AccessLevel.deleteAccessLevelById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
