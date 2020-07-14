const router = require('express').Router();
const Company = require('../models/company');
const { isCompanyBodyValid } = require('./utils/companiesValidation');
const { idRegEx, idErrorObj } = require('./utils/idValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Company.getAllCompanies();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Company.getCompanyById({ id: parseInt(req.params.id) });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
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
        const [result, errorObj] = await isCompanyBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Company.addNewCompany(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: 'An error occurred trying to add the new company!' });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    if (!idRegEx.test(req.body.company_id)) return res.status(400).json(idErrorObj);
    try {
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
        const [result, errorObj] = await isCompanyBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        const [data, error] = await Company.updateCompanyById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: 'An error occurred trying to update the company!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await Company.deleteCompanyById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: 'No company found with that company_id!' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
