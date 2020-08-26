const Joi = require('joi');

const usersSchema = Joi.object({
    user_id: Joi.number().integer().min(0),
    username: Joi.string().required(),
    password: Joi.string().required(),
    access_id: Joi.number().integer().min(0),
    active: Joi.number().integer().min(0).max(1).message('the active field serves as a boolean and must be either 0 or 1').required(),
});

const userIdSchema = Joi.object({
    user_id: Joi.number().integer().required(),
});

module.exports = {
    usersSchema,
    userIdSchema,
};
