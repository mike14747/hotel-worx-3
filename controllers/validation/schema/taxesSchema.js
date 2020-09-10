const Joi = require('joi');
const { activeError } = require('../../utils/errorMessages');

const taxesSchema = Joi.object({
    tax_id: Joi.optional(),
    tax_name: Joi.string().required(),
    tax_rate: Joi.number().min(0).required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.base': activeError,
        'number.integer': activeError,
        'number.min': activeError,
        'number.max': activeError,
    }).required(),
});

const taxIdSchema = Joi.object({
    tax_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    taxesSchema,
    taxIdSchema,
};
