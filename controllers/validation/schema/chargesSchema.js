const Joi = require('joi');
const { boolError } = require('../../utils/errorMessages');

const chargesSchema = Joi.object({
    charge_id: Joi.optional(),
    res_room_id: Joi.number().integer().min(0).required(),
    charge_type_id: Joi.number().integer().min(0).required(),
    charge_amount: Joi.number().required(),
    taxable: Joi.number().integer().min(0).max(1).messages({
        'number.base': '"taxable" ' + boolError,
        'number.integer': '"taxable" ' + boolError,
        'number.min': '"taxable" ' + boolError,
        'number.max': '"taxable" ' + boolError,
    }).required(),
});

const chargeIdSchema = Joi.object({
    charge_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    chargesSchema,
    chargeIdSchema,
};
