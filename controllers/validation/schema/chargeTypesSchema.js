const Joi = require('joi');
const { activeError } = require('../../utils/errorMessages');

const chargeTypesSchema = Joi.object({
    charge_type_id: Joi.optional(),
    charge_type: Joi.string().required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.min': activeError,
        'number.max': activeError,
    }).required(),
});

const chargeTypeIdSchema = Joi.object({
    charge_type_id: Joi.number().integer().required(),
});

module.exports = {
    chargeTypesSchema,
    chargeTypeIdSchema,
};
