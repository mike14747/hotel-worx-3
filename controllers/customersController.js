const router = require('express').Router();
const Customer = require('../models/customer');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { customersSchema, customerIdSchema } = require('./validation/schema/customersSchema');
const isCustomerIdValid = require('./validation/helpers/isCustomerIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Customer.getAllCustomers();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await customerIdSchema.validateAsync({ customer_id: req.params.id });
        const [data, error] = await Customer.getCustomerById({ id: parseInt(req.params.id) });
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
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
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
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await customerIdSchema.validateAsync({ customer_id: req.params.id });
        const [data, error] = await Customer.deleteCustomerById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
