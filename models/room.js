const connection = require('../config/connection');

const Room = {
    getAllRooms: (cb) => {
        const queryString = 'SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id ORDER BY rm.room_num ASC;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getRoomById: (id, cb) => {
        const queryString = 'SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id WHERE rm.room_id=? ORDER BY rm.room_num ASC LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getAllRoomIdsNums: (cb) => {
        const queryString = 'SELECT rm.room_id, rm.room_num FROM rooms AS rm ORDER BY rm.room_id ASC;';
        connection.execute(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    getRoomsHouseStatus: (cb) => {
        const queryString = 'SELECT COUNT(*) AS roomsToSell, SUM(CASE WHEN rm.clean=1 && rm.occupied=1 THEN 1 ELSE 0 END) AS cleanOccupied, SUM(CASE WHEN rm.clean=1 && rm.occupied=0 THEN 1 ELSE 0 END) AS cleanVacant, SUM(CASE WHEN rm.clean=0 && rm.occupied=1 THEN 1 ELSE 0 END) AS dirtyOccupied, SUM(CASE WHEN rm.clean=0 && rm.occupied=0 THEN 1 ELSE 0 END) AS dirtyVacant FROM rooms AS rm WHERE rm.active=1;';
        connection.execute(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    getAvailableRoomListByDate: (date, cb) => {
        const queryString = 'SET @input_date=?;SELECT rm.room_id, rm.room_num, rm.room_type_id, rm.clean, rm.occupied, IFNULL(ae.avail, "n/a") AS availability_end FROM rooms AS rm LEFT JOIN (SELECT room_id, MIN(check_in_date) AS avail FROM res_rooms WHERE check_in_date>@input_date && room_id IS NOT NULL GROUP BY room_id) AS ae ON rm.room_id=ae.room_id WHERE rm.active=1 && rm.room_id NOT IN (SELECT room_id FROM res_rooms WHERE room_id IS NOT NULL && check_in_date<=@input_date && check_out_date>@input_date);';
        const queryParams = [date];
        connection.execute(queryString, queryParams, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    addNewRoom: (paramsObj, cb) => {
        const queryString = 'INSERT INTO rooms (room_num, room_type_id, description, num_beds, clean, occupied, active) VALUES (?,?,?,?,?,?,?);';
        const queryParams = [paramsObj.room_num, paramsObj.room_type_id, paramsObj.description, paramsObj.num_beds, paramsObj.clean, paramsObj.occupied, paramsObj.active];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateRoomById: (paramsObj, cb) => {
        const queryString = 'UPDATE rooms SET room_num=?, room_type_id=?, description=?, num_beds=?, clean=?, occupied=?, active=? WHERE room_id=?;';
        const queryParams = [paramsObj.room_num, paramsObj.room_type_id, paramsObj.description, paramsObj.num_beds, paramsObj.clean, paramsObj.occupied, paramsObj.active, paramsObj.room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateRoomOccupiedById: (paramsObj, cb) => {
        const queryString = 'UPDATE rooms SET occupied=? WHERE room_id=?;';
        const queryParams = [paramsObj.occupied, paramsObj.room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateRoomCheckedOutById: (id, cb) => {
        const queryString = 'UPDATE rooms SET occupied=0, clean=0 WHERE room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateRoomCleanById: (paramsObj, cb) => {
        const queryString = 'UPDATE rooms SET clean=? WHERE room_id=?;';
        const queryParams = [paramsObj.clean, paramsObj.room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteRoomById: (id, cb) => {
        const queryString = 'DELETE FROM rooms WHERE room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getRoomsHousekeepingStatus: (paramsObj, cb) => {
        const queryString = 'SELECT rm.room_num, rm.clean, rm.occupied, rm.active, rt.type, rr.checked_in, rr.checked_out, rr.room_id, CASE WHEN rr.check_out_date=CURDATE() THEN ("Due Out") END AS departure, CASE WHEN rr.check_in_date<CURDATE() && rr.check_out_date>CURDATE() THEN ("Stay Over") END AS stayover FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id LEFT JOIN res_rooms AS rr ON rm.room_id=rr.room_id && rr.active=1 WHERE (rm.active=? || rm.active=?) && (rm.clean=? || rm.clean=?) && (rm.occupied=? || rm.occupied=?)' + paramsObj.extraConditions + ' GROUP BY rm.room_id ORDER BY rm.room_id ASC;';
        const queryParams = [Number(paramsObj.active), Number(paramsObj.active2), Number(paramsObj.clean), Number(paramsObj.clean2), Number(paramsObj.occupied), Number(paramsObj.occupied2)];
        connection.execute(queryString, queryParams, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
};

module.exports = Room;
