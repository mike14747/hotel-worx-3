const Joi = require('joi');
const { boolError } = require('../../utils/errorMessages');

const paymentTypesSchema = Joi.object({
    payment_type_id: Joi.optional(),
    payment_type: Joi.string().required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.min': '"active" ' + boolError,
        'number.max': '"active" ' + boolError,
    }).required(),
});

const paymentTypeIdSchema = Joi.object({
    payment_type_id: Joi.number().integer().required(),
});

module.exports = {
    paymentTypesSchema,
    paymentTypeIdSchema,
};
