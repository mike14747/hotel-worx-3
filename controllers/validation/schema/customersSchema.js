const Joi = require('joi');

const schema = Joi.object({
    customer_id: Joi.number().integer(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    credit_card_num: Joi.string().required(),
    cc_expiration: Joi.string().required(),
});

module.exports = schema;
