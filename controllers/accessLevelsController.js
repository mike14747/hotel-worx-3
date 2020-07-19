const { addNewTax } = require('../models/tax');

const router = require('express').Router();
const AccessLevel = require('../models/accessLevel');
const { isAccessLevelValid } = require('./validation/accessLevelsValidation');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await AccessLevel.getAllAccessLevels();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await AccessLevel.getAccessLevelsById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            access_level: req.body.access_level,
            access_type: req.body.access_type,
        };
        const [result, errorObj] = await isAccessLevelValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await AccessLevel.addNewAccessLevel(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        if (!idRegEx.test(req.body.access_id)) return res.status(400).json(idErrorObj);
        const paramsObj = {
            access_id: parseInt(req.body.access_id),
            access_level: parseInt(req.body.access_level),
            access_type: req.body.access_type,
        };
        const [result, errorObj] = await isAccessLevelValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await AccessLevel.updateAccessLevel(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await AccessLevel.deleteAccessLevelById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
