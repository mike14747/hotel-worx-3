const Joi = require('joi');

const chargesSchema = Joi.object({
    res_room_id: Joi.number().integer().min(0).required(),
    charge_id: Joi.number().integer().min(0),
    charge_type_id: Joi.number().integer().min(0).required(),
    charge_amount: Joi.number().required(),
    taxable: Joi.number().integer().min(0).message('the taxable field serves as a boolean and must be either 0 or 1').max(1).message('the taxable field serves as a boolean and must be either 0 or 1').required(),
});

const chargeIdSchema = Joi.object({
    charge_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    chargesSchema,
    chargeIdSchema,
};
