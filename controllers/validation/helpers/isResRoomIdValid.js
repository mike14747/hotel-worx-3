const ResRoom = require('../../../models/resRoom');

const isResRoomIdValid = async (id) => {
    const [data, error] = await ResRoom.getResRoomByResRoomId({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('res_room_id ' + id + ' does not exist!');
};

module.exports = isResRoomIdValid;
