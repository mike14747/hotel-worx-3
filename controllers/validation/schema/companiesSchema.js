const Joi = require('joi');
const boolError = require('../../utils/errorMessages');

const companiesSchema = Joi.object({
    company_id: Joi.optional(),
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
    tax_exempt: Joi.number().integer().min(0).max(1).messages({
        'number.min': '"tax_exempt" ' + boolError,
        'number.max': '"tax_exempt" ' + boolError,
    }).required(),
});

const companyIdSchema = Joi.object({
    company_id: Joi.number().integer().required(),
});

module.exports = {
    companiesSchema,
    companyIdSchema,
};
