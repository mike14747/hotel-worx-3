const connection = require('../config/connection');

const ResRoom = {
    getAllResRooms: (cb) => {
        const queryString = 'SELECT rr.res_room_id, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments, rr.allow_charges, rr.active FROM res_rooms AS rr ORDER BY rr.res_room_id ASC;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getResRoomByResRoomId: (id, cb) => {
        const queryString = 'SELECT rr.res_room_id, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments, rr.allow_charges, rr.active FROM res_rooms AS rr WHERE rr.res_room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getResRoomsByReservationId: (id, cb) => {
        const queryString = 'SELECT rr.res_room_id, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments, rr.allow_charges, rr.active FROM res_rooms AS rr WHERE rr.reservation_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getMaxCCodeByReservationId: (id, cb) => {
        const queryString = 'SELECT COUNT(*) AS totalRooms, (SELECT COUNT(*) FROM res_rooms WHERE reservation_id=? && !isnull(room_id)) AS numAssignedRooms, MAX(CONVERT(RIGHT(rr.confirmation_code, 3), UNSIGNED INTEGER)) AS currentMaxCCode FROM res_rooms AS rr WHERE rr.reservation_id=?;';
        const queryParams = [id, id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addSomeResRooms: (paramsArr, cb) => {
        const queryString = 'INSERT INTO res_rooms (reservation_id, room_type_id, check_in_date, check_out_date, adults, rate, confirmation_code, comments, allow_charges) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
        paramsArr.forEach((room, i) => {
            const queryParams = [room.reservation_id, room.room_type_id, room.check_in_date, room.check_out_date, room.adults, room.rate, room.confirmation_code, room.comments, room.allow_charges];
            connection.execute(queryString, queryParams, (err, result) => {
                if (err) throw err;
                if ((i + 1) === paramsArr.length) {
                    cb(result);
                }
            });
        });
    },
    updateResRoomInfoById: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET room_type_id=?, check_in_date=?, check_out_date=?, adults=?, rate=?, comments=?, allow_charges=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.room_type_id, paramsObj.check_in_date, paramsObj.check_out_date, paramsObj.adults, paramsObj.rate, paramsObj.comments, paramsObj.allow_charges, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomAssignById: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET room_type_id=?, room_id=?, rate=?, confirmation_code=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.room_type_id, paramsObj.room_id, paramsObj.rate, paramsObj.confirmation_code, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomReassignById: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET room_type_id=?, room_id=?, rate=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.room_type_id, paramsObj.room_id, paramsObj.rate, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomCheckinById: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET checked_in=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.checked_in, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomCheckoutById: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET checked_out=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.checked_out, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomActiveByResRoomId: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET active=? WHERE res_room_id=?;';
        const queryParams = [paramsObj.active, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateResRoomActiveByReservationId: (paramsObj, cb) => {
        const queryString = 'UPDATE res_rooms SET active=? WHERE reservation_id=?;';
        const queryParams = [paramsObj.active, paramsObj.reservation_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteResRoomByResRoomId: (id, cb) => {
        const queryString = 'DELETE FROM res_rooms WHERE res_room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteResRoomsByReservationId: (id, cb) => {
        const queryString = 'DELETE FROM res_rooms WHERE reservation_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = ResRoom;
