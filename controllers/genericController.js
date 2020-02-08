const router = require('express').Router();
const Generic = require('../models/generic');

router.get('/', async (req, res, next) => {
    try {
        const data = await Generic.getAllTestGenerics();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Generic.getTestGenericById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
