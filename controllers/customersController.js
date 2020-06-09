const router = require('express').Router();
const Customer = require('../models/customer');

// all these routes point to /api/customers as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await Customer.getAllCustomers();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Customer.getCustomerById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
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
    try {
        const data = await Customer.addNewCustomer(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
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
    try {
        const data = await Customer.updateCustomerById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Customer.deleteCustomerById({ id: parseInt(req.params.id) || 0 });
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
