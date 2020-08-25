const RoomType = require('../../../models/roomType');

const isRoomTypeIdValid = async (id) => {
    const [data, error] = await RoomType.getRoomTypeById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('room_type_id ' + id + ' does not exist!');
};

module.exports = isRoomTypeIdValid;
