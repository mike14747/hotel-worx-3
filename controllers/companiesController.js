const router = require('express').Router();
const Company = require('../models/company');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { companiesSchema, companyIdSchema } = require('./validation/schema/companiesSchema');
const isCompanyIdValid = require('./validation/helpers/isCompanyIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Company.getAllCompanies();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await companyIdSchema.validateAsync({ company_id: req.params.id });
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
            tax_exempt: parseInt(req.body.tax_exempt),
        };
        await companiesSchema.validateAsync(paramsObj);
        const [data, error] = await Company.addNewCompany(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            company_id: parseInt(req.body.company_id),
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
            tax_exempt: parseInt(req.body.tax_exempt),
        };
        await companiesSchema.validateAsync(paramsObj);
        await isCompanyIdValid(paramsObj.company_id);
        const [data, error] = await Company.updateCompanyById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await companyIdSchema.validateAsync({ company_id: req.params.id });
        await isCompanyIdValid(req.params.id);
        const [data, error] = await Company.deleteCompanyById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
