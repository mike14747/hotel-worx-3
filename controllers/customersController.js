const router = require('express').Router();
const Customer = require('../models/customer');

// all these routes point to /api/customers as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/customers route root!');
});

router.get('/all', (req, res) => {
    Customer.getAllCustomers((data) => {
        res.json(data);
    });
});

router.get('/id/:id', (req, res) => {
    Customer.getCustomerById(req.params.id, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
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
    Customer.addNewCustomer(paramsObj, (data) => {
        if (data.insertId) {
            res.status(200).send('New customer was successfully added!');
        } else {
            res.status(400).send('Could not add the new customer... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
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
    Customer.updateCustomerById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Customer info was successfully updated!');
        } else {
            res.status(400).send('Could not update customer... please check your request and try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    Customer.deleteCustomerById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Customer was successfully deleted!');
        } else {
            res.status(400).send('Could not delete customer... please check your request and try again!');
        }
    });
});

module.exports = router;
