const Joi = require('joi');

const paymentTypesSchema = Joi.object({
    paymeny_type_id: Joi.number().integer().min(0),
    paymeny_type: Joi.string().required(),
    active: Joi.number().integer().min(0).max(1).message('the active field serves as a boolean and must be either 0 or 1').required(),
});

const paymentTypeIdSchema = Joi.object({
    payment_type_id: Joi.number().integer().required(),
});

module.exports = {
    paymentTypesSchema,
    paymentTypeIdSchema,
};
