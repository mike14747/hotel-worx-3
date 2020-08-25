const Room = require('../../../models/room');

const isRoomIdValid = async (id) => {
    const [data, error] = await Room.getRoomById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('room_id ' + id + ' does not exist!');
};

module.exports = isRoomIdValid;
