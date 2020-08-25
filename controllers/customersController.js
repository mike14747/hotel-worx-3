const router = require('express').Router();
const Customer = require('../models/customer');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');
const customersSchema = require('./validation/schema/customersSchema');
const isCustomerIdValid = require('./validation/helpers/isCustomerIdValid');
const Joi = require('joi');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Customer.getAllCustomers();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Customer.getCustomerById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            credit_card_num: req.body.credit_card_num,
            cc_expiration: req.body.cc_expiration,
        };
        await customersSchema.validateAsync(paramsObj);
        const [data, error] = await Customer.addNewCustomer(paramsObj);
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
            customer_id: req.body.customer_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            credit_card_num: req.body.credit_card_num,
            cc_expiration: req.body.cc_expiration,
        };
        await customersSchema.validateAsync(paramsObj);
        await isCustomerIdValid(paramsObj.customer_id);
        const [data, error] = await Customer.updateCustomerById(paramsObj);
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
        const [data, error] = await Customer.deleteCustomerById({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
