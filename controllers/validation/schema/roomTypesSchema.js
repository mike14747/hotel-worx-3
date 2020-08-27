const Joi = require('joi');

const roomTypesSchema = Joi.object({
    room_type_id: Joi.number().integer().min(0),
    room_type: Joi.string().required(),
    room_rate: Joi.number().min(0).required(),
});

const roomTypeIdSchema = Joi.object({
    room_type_id: Joi.number().integer().required(),
});

const roomTypeDateSchema = Joi.object({
    date: Joi.date().iso().required(),
});

module.exports = {
    roomTypesSchema,
    roomTypeIdSchema,
    roomTypeDateSchema,
};
