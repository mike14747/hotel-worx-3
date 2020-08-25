const Joi = require('joi');

const chargesSchema = Joi.object({
    res_room_id: Joi.number().integer().required(),
    charge_id: Joi.number().integer(),
    charge_type_id: Joi.number().integer().required(),
    charge_amount: Joi.number().required(),
    taxable: Joi.number().integer().min(0).max(1).required(),
});

const chargeIdSchema = Joi.object({
    charge_id: Joi.number().integer().required(),
});

module.exports = {
    chargesSchema,
    chargeIdSchema,
};
