const Joi = require('joi');
const { boolError } = require('../../utils/errorMessages');

const taxesSchema = Joi.object({
    tax_id: Joi.optional(),
    tax_name: Joi.string().required(),
    tax_rate: Joi.number().min(0).required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.base': '"active" ' + boolError,
        'number.integer': '"active" ' + boolError,
        'number.min': '"active" ' + boolError,
        'number.max': '"active" ' + boolError,
    }).required(),
});

const taxIdSchema = Joi.object({
    tax_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    taxesSchema,
    taxIdSchema,
};
