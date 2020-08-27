const Joi = require('joi');

const companiesSchema = Joi.object({
    company_id: Joi.number().integer().min(0),
    company_name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    credit_card_num: Joi.string().required(),
    cc_expiration: Joi.string().required(),
    tax_exempt: Joi.number().integer().min(0).message('the tax_exempt field serves as a boolean and must be either 0 or 1').max(1).message('the tax_exempt field serves as a boolean and must be either 0 or 1').required(),
});

const companyIdSchema = Joi.object({
    company_id: Joi.number().integer().required(),
});

module.exports = {
    companiesSchema,
    companyIdSchema,
};
