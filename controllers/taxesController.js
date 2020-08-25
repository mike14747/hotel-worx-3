const router = require('express').Router();
const Tax = require('../models/tax');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');
const taxesSchema = require('./validation/schema/taxesSchema');
const isTaxIdValid = require('./validation/helpers/isTaxIdValid');
const Joi = require('joi');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Tax.getAllTaxes();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
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
        await taxesSchema.validateAsync(paramsObj);
        const [data, error] = await Tax.addNewTax(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({ 'Validation error': error.details[0].message });
        } else {
            next(error);
        }
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
        await isTaxIdValid(paramsObj.tax_id);
        const [data, error] = await Tax.updateTaxById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({ 'Validation error': error.details[0].message });
        } else if (error instanceof RangeError) {
            return res.status(400).json({ 'Invalid request': error.message });
        } else {
            next(error);
        }
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Tax.deleteTaxById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
