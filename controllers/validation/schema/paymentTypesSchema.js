const Joi = require('joi');
const { activeError } = require('../../utils/errorMessages');

const paymentTypesSchema = Joi.object({
    payment_type_id: Joi.number().integer().min(0),
    payment_type: Joi.string().required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.min': activeError,
        'number.max': activeError,
    }).required(),
});

const paymentTypeIdSchema = Joi.object({
    payment_type_id: Joi.number().integer().required(),
});

module.exports = {
    paymentTypesSchema,
    paymentTypeIdSchema,
};
