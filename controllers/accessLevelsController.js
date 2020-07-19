const { addNewTax } = require('../models/tax');

const router = require('express').Router();
const AccessLevel = require('../models/accessLevel');
const { idRegEx, idErrorObj } = require('./validation/idValidation');

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

module.exports = router;
