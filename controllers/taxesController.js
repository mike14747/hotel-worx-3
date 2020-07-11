const router = require('express').Router();
const Tax = require('../models/tax');
const { taxExists } = require('./utils/taxesValidation');

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
        const [data, error] = await Tax.getTaxById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const errorArray = [];
        if (typeof (req.body.tax_name) !== 'string' || req.body.tax_name.length < 1) errorArray.push('tax_name should be a string with non-zero length');
        if (isNaN(parseFloat(req.body.tax_rate))) errorArray.push('tax_rate is not in a valid decimal format');
        if (!/^[0-1]$/.test(req.body.active)) errorArray.push('active parameter is a boolean and should be 0 or 1');
        if (errorArray.length > 0) {
            return res.status(400).json({
                message: 'Errors exist in the transmitted request body.',
                errorList: errorArray,
            });
        }
        const paramsObj = {
            tax_name: req.body.tax_name,
            tax_rate: req.body.tax_rate,
        };
        const [data, error] = await Tax.addNewTax(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add a new tax!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const errorArray = [];
    const [doesTaxExist, taxErrorMsg] = await taxExists(req.body.tax_id);
    if (!doesTaxExist) errorArray.push(taxErrorMsg);
    if (typeof (req.body.tax_name) !== 'string' || req.body.tax_name.length < 1) errorArray.push('tax_name should be a string with non-zero length');
    if (isNaN(parseFloat(req.body.tax_rate))) errorArray.push('tax_rate is not in a valid decimal format');
    if (!/^[0-1]$/.test(req.body.active)) errorArray.push('active parameter is a boolean and should be 0 or 1');
    if (errorArray.length > 0) {
        return res.status(400).json({
            message: 'Errors exist in the transmitted request body.',
            errorList: errorArray,
        });
    }
    try {
        const paramsObj = {
            tax_id: req.body.tax_id,
            tax_name: req.body.tax_name,
            tax_rate: req.body.tax_rate,
            active: req.body.active,
        };
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
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred... probably because of a foreign key constraint on that tax. A better option might be to make this tax inactive.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
