const router = require('express').Router();
const Company = require('../models/company');

// all these routes point to /api/companies as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/companies route root!');
});

router.get('/all', (req, res) => {
    Company.getAllCompanies((data) => {
        res.json(data);
    });
});

router.get('/id/:id', (req, res) => {
    Company.getCompanyById(req.params.id, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = {
        company_name: req.body.company_name,
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
    Company.addNewCompany(paramsObj, (data) => {
        if (data.insertId) {
            res.status(200).send('New company was successfully added!');
        } else {
            res.status(400).send('Could not add the new company... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
    const paramsObj = {
        company_id: req.body.company_id,
        company_name: req.body.company_name,
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
    Company.updateCompanyById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Company info was successfully updated!');
        } else {
            res.status(400).send('Could not update company... please check your request and try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    Company.deleteCompanyById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Company was successfully deleted!');
        } else {
            res.status(400).send('Could not delete company... please check your request and try again!');
        }
    });
});

module.exports = router;
