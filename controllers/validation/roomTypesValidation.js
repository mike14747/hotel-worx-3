const RoomType = require('../../models/roomType');
const { message } = require('./generalValidation');

const isRoomTypeValid = async (paramsObj) => {
    const errorArray = [];
    if (paramsObj.room_type_id != null) {
        try {
            const [data, error] = await RoomType.getRoomTypeById({ id: paramsObj.room_type_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('room_type_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    if (typeof (paramsObj.type) !== 'string' || paramsObj.type.length < 1) errorArray.push('room type should be a string with non-zero length');
    if (isNaN(parseFloat(paramsObj.rate))) errorArray.push('room rate is not in a valid dollar amount');
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isRoomTypeValid,
};
