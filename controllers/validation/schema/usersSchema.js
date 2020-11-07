const Joi = require('joi');
const { activeError, usernameError, passwordError } = require('../../utils/errorMessages');

const usersSchema = Joi.object({
    user_id: Joi.optional(),
    username: Joi.string().min(6).max(12).messages({
        'string.min': usernameError,
        'string.max': usernameError,
    }).required(),
    password: Joi.string().min(6).max(20).messages({
        'string.min': passwordError,
        'string.max': passwordError,
    }).required(),
    email: Joi.string().email().required(),
    access_id: Joi.number().integer().min(0).required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.min': activeError,
        'number.max': activeError,
    }).required(),
});

const userIdSchema = Joi.object({
    user_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    usersSchema,
    userIdSchema,
};
