const router = require('express').Router();
const Customer = require('../models/customer');

// all these routes point to /api/customers as specified in server.js and controllers/index.js

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/customers route root!');
});

router.get('/all', (req, res) => {
    Customer.getAllCustomers((data) => {
        res.json(data);
    });
});

router.get('/:id', (req, res) => {
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
        email: req.body.email,
        phone: req.body.phone,
        credit_card_num: req.body.credit_card_num,
        cc_expiration: req.body.cc_expiration,
    };
    Customer.addNewCustomer(paramsObj, (data) => {
        if (data.insertId) {
            res.status(201).send('New customer was successfully added!');
        } else {
            res.status(500).send('Could not add the new customer due to server error... please try again!');
        }
    });
});

router.put('/:id', (req, res) => {
    const paramsObj = {
        customer_id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        phone: req.body.phone,
        credit_card_num: req.body.credit_card_num,
        cc_expiration: req.body.cc_expiration,
    };
    Customer.updateCustomerById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(201).send('Customer info was successfully updated!');
        } else {
            res.status(400).send('Could not find customer... please try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    Customer.deleteCustomerById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(201).send('Customer was successfully deleted!');
        } else {
            res.status(202).send('Customer could not be deleted!');
        }
    });
});

module.exports = router;
