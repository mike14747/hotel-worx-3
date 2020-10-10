const router = require('express').Router();
const Tax = require('../models/tax');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { taxesSchema, taxIdSchema } = require('./validation/schema/taxesSchema');
const isTaxIdValid = require('./validation/helpers/isTaxIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Tax.getAllTaxes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await taxIdSchema.validateAsync({ tax_id: req.params.id });
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
        await taxesSchema.validateAsync(paramsObj);
        const [data, error] = await Tax.addNewTax(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
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
        await taxesSchema.validateAsync(paramsObj);
        await taxIdSchema.validateAsync({ tax_id: paramsObj.tax_id });
        await isTaxIdValid(paramsObj.tax_id);
        const [data, error] = await Tax.updateTaxById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await taxIdSchema.validateAsync({ tax_id: req.params.id });
        await isTaxIdValid(req.params.id);
        const [data, error] = await Tax.deleteTaxById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
