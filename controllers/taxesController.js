const router = require('express').Router();
const Tax = require('../models/tax');
const { taxExists } = require('.utils/taxesValidation');

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
        const paramsObj = {
            tax_name: req.body.tax_name,
            tax_rate: req.body.tax_rate,
        };
        const [data, error] = await Tax.addNewTax(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

/*
tax_id
tax_name
tax_rate
active
*/

router.put('/', async (req, res, next) => {
    const errorArray = [];
    const [doesTaxExist, taxErrorMsg] = await taxExists(req.body.tax_id);
    if (!doesTaxExist) errorArray.push(taxErrorMsg);
    if (typeof (req.body.tax_name) !== 'string' || req.body.tax_name.length < 1) errorArray.push('tax_name should be a string with non-zero length');
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
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!/^[0-9]+$/.test(req.params.id)) return res.status(400).json({ message: 'ID param needs to be an integer!' });
    try {
        const [data, error] = await Tax.deleteTaxById({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data.length > 0 ? res.json(data) : res.status(400).json({ message: `No taxes were found with id ${req.params.id}!` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
