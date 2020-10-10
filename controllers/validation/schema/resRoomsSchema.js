const Joi = require('joi');

const resRoomsSchema = Joi.object({

});

const resRoomIdSchema = Joi.object({
    res_room_id: Joi.number().integer().required(),
});

module.exports = {
    resRoomsSchema,
    resRoomIdSchema,
};
