const Joi = require('joi');
const { dateError } = require('../../utils/errorMessages');

const roomTypesSchema = Joi.object({
    room_type_id: Joi.number().integer().min(0),
    room_type: Joi.string().required(),
    room_rate: Joi.number().min(0).required(),
});

const roomTypeIdSchema = Joi.object({
    room_type_id: Joi.number().integer().required(),
});

const roomTypeDateSchema = Joi.object({
    dateCheck1: Joi.date().iso().messages({
        'date.base': dateError,
        'date.format': dateError,
    }).required(),
    dateCheck2: Joi.string().pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')).message(dateError).required(),
});

module.exports = {
    roomTypesSchema,
    roomTypeIdSchema,
    roomTypeDateSchema,
};
