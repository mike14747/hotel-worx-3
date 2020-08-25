const Joi = require('joi');

const taxesSchema = Joi.object({
    tax_id: Joi.number().integer().min(0),
    tax_name: Joi.string().required(),
    tax_rate: Joi.number().min(0).required(),
    active: Joi.number().integer().min(0).max(1).message('the active field serves as a boolean and must be either 0 or 1').required(),
});

const taxIdSchema = Joi.object({
    tax_id: Joi.number().integer().required(),
});

module.exports = {
    taxesSchema,
    taxIdSchema,
};
