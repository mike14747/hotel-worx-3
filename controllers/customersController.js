const router = require('express').Router();
const Customer = require('../models/customer');
const { isCustomerBodyValid } = require('./utils/customersValidation');
const { idRegEx, idErrorObj } = require('./utils/idValidation');

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
        const [result, errorObj] = await isCustomerBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Customer.addNewCustomer(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add the new customer!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    if (!idRegEx.test(req.body.customer_id)) return res.status(400).json(idErrorObj);
    try {
        const paramsObj = {
            customer_id: parseInt(req.body.customer_id),
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
        const [result, errorObj] = await isCustomerBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Customer.updateCustomerById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to update the customer!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Customer.deleteCustomerById({ id: parseInt(req.params.id) || 0 });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to delete that customer_id!' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
