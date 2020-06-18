const router = require('express').Router();
const Tax = require('../models/tax');

// all these routes point to /api/taxes as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Tax.getAllTaxes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9])', async (req, res, next) => {
    try {
        const [data, error] = await Tax.getTaxById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
    };
    try {
        const [data, error] = await Tax.addNewTax(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        tax_id: req.body.tax_id,
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
        active: req.body.active,
    };
    try {
        const [data, error] = await Tax.updateTaxById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id([0-9])', async (req, res, next) => {
    try {
        const [data, error] = await Tax.deleteTaxById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
