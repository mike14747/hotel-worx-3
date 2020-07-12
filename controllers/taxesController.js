const router = require('express').Router();
const Tax = require('../models/tax');
const { taxExists, isTaxBodyValid } = require('./utils/taxesValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Tax.getAllTaxes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Tax.getTaxById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            tax_name: req.body.tax_name,
            tax_rate: req.body.tax_rate,
            active: req.body.active,
        };
        const [result, errorObj] = await isTaxBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Tax.addNewTax(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add a new tax!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            tax_id: req.body.tax_id,
            tax_name: req.body.tax_name,
            tax_rate: req.body.tax_rate,
            active: req.body.active,
        };
        const [result, errorObj] = await isTaxBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Tax.updateTaxById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to update a tax!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Tax.deleteTaxById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred... either it does not exist or there is a foreign key constraint.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
