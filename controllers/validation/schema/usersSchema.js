const Joi = require('joi');
const { activeError } = require('../../utils/errorMessages');

const usersSchema = Joi.object({
    user_id: Joi.number().integer().min(0),
    username: Joi.string().min(6).max(12).messages({
        'string.min': 'The "username" field must be from 6 to 12 characters in length.',
        'string.max': 'The "username" field must be from 6 to 12 characters in length.',
    }).required(),
    password: Joi.string().min(6).max(20).messages({
        'string.min': 'The "password" field must be from 6 to 20 characters in length.',
        'string.max': 'The "password" field must be from 6 to 20 characters in length.',
    }).required(),
    email: Joi.string().email().required(),
    access_id: Joi.number().integer().min(0),
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
