const Joi = require('joi');

const schema = Joi.object({
    tax_id: Joi.number().integer(),
    tax_name: Joi.string().required(),
    tax_rate: Joi.number().min(0).required(),
    active: Joi.number().integer().min(0).max(1).required(),
});

module.exports = schema;
