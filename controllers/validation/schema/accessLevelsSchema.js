const Joi = require('joi');

const accessLevelsSchema = Joi.object({
    access_id: Joi.optional(),
    access_level: Joi.number().min(0).required(),
    access_type: Joi.string().required(),
});

const accessIdSchema = Joi.object({
    access_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    accessLevelsSchema,
    accessIdSchema,
};
