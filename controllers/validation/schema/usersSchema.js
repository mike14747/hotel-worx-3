const Joi = require('joi');
const { activeError } = require('../../utils/errorMessages');

const usersSchema = Joi.object({
    user_id: Joi.number().integer().min(0),
    username: Joi.string().required(),
    password: Joi.string().required(),
    access_id: Joi.number().integer().min(0),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.min': activeError,
        'number.max': activeError,
    }).required(),
});

const userIdSchema = Joi.object({
    user_id: Joi.number().integer().required(),
});

module.exports = {
    usersSchema,
    userIdSchema,
};
