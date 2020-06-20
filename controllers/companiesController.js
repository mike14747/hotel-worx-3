const router = require('express').Router();
const Company = require('../models/company');

// all these routes point to /api/companies as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Company.getAllCompanies();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await Company.getCompanyById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
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
        tax_exempt: req.body.tax_exempt,
    };
    try {
        const [data, error] = await Company.addNewCompany(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
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
        tax_exempt: req.body.tax_exempt,
    };
    try {
        const [data, error] = await Company.updateCompanyById(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id([0-9]+)', async (req, res, next) => {
    try {
        const [data, error] = await Company.deleteCompanyById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
