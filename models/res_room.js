const connection = require('../config/connection');

const ResRoom = {
    getAllResRooms: (cb) => {
        const queryString = 'SELECT res_room_id, reservation_id, room_type_id, check_in_date, check_out_date, checked_in, checked_out, adults, room_id, rate, confirmation_code, comments FROM res_rooms AS rr ORDER BY rr.res_room_id ASC;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getResRoomById: (id, cb) => {
        const queryString = 'SELECT res_room_id, reservation_id, room_type_id, check_in_date, check_out_date, checked_in, checked_out, adults, room_id, rate, confirmation_code, comments FROM res_rooms AS rr WHERE rr.res_room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewResRoom: (paramsObj, cb) => {
        const queryString = 'INSERT INTO res_rooms (reservation_id, room_type_id, check_in_date, check_out_date, checked_in, checked_out, adults, room_id, rate, confirmation_code, comments) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
        const queryParams = [paramsObj.reservation_id, paramsObj.room_type_id, paramsObj.check_in_date, paramsObj.check_out_date, paramsObj.checked_in, paramsObj.checked_out, paramsObj.adults, paramsObj.room_id, paramsObj.rate, paramsObj.confirmation_code, paramsObj.comments];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomTypeById: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET reservation_id=?, room_type_id=?, check_in_date=?, check_out_date=?, checked_in=?, checked_out=?, adults=?, room_id=?, rate=?, confirmation_code=?, comments=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.reservation_id, paramsObj.room_type_id, paramsObj.check_in_date, paramsObj.check_out_date, paramsObj.checked_in, paramsObj.checked_out, paramsObj.adults, paramsObj.room_id, paramsObj.rate, paramsObj.confirmation_code, paramsObj.comments, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteResRoomById: (id, cb) => {
        const queryString = 'DELETE FROM res_rooms WHERE res_room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = ResRoom;
