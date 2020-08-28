const Joi = require('joi');
const taxableError = require('../../utils/errorMessages');

const chargesSchema = Joi.object({
    res_room_id: Joi.number().integer().min(0).required(),
    charge_id: Joi.number().integer().min(0),
    charge_type_id: Joi.number().integer().min(0).required(),
    charge_amount: Joi.number().required(),
    taxable: Joi.number().integer().min(0).max(1).messages({
        'number.min': taxableError,
        'number.max': taxableError,
    }).required(),
});

const chargeIdSchema = Joi.object({
    charge_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    chargesSchema,
    chargeIdSchema,
};
