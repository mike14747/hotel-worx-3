const Joi = require('joi');
const { boolError } = require('../../utils/errorMessages');

const reservationNewSchema = Joi.object({

});

const reservationUpdateSchema = Joi.object({
    reservation_id: Joi.optional(),
    customer_id: Joi.number().integer().min(0).required(),
    user_id: Joi.number().integer().min(0).required(),
    company_id: Joi.number().integer().min(0),
    comments: Joi.string().required(),
    active: Joi.number().integer().min(0).max(1).messages({
        'number.base': '"active" ' + boolError,
        'number.integer': '"active" ' + boolError,
        'number.min': '"active" ' + boolError,
        'number.max': '"active" ' + boolError,
    }).required(),
});

const reservationIdSchema = Joi.object({
    reservation_id: Joi.number().integer().min(0).required(),
});

module.exports = {
    reservationNewSchema,
    reservationUpdateSchema,
    reservationIdSchema,
};
