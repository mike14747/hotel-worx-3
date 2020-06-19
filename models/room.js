const pool = require('../config/connectionPool.js').getDb();

const Room = {
    getAllRooms: async () => {
        try {
            const queryString = 'SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id ORDER BY rm.room_num ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getRoomById: async (paramsObj) => {
        try {
            const queryString = 'SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id WHERE rm.room_id=? ORDER BY rm.room_num ASC LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAllRoomIdsNums: async () => {
        try {
            const queryString = 'SELECT rm.room_id, rm.room_num FROM rooms AS rm ORDER BY rm.room_id ASC;';
            // const queryParams = [];
            const [result] = await pool.query(queryString);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getRoomsHouseStatus: async () => {
        try {
            const queryString = 'SELECT COUNT(*) AS roomsToSell, CAST(SUM(CASE WHEN rm.clean=1 && rm.occupied=1 THEN 1 ELSE 0 END) AS signed) AS cleanOccupied, CAST(SUM(CASE WHEN rm.clean=1 && rm.occupied=0 THEN 1 ELSE 0 END) AS signed) AS cleanVacant, CAST(SUM(CASE WHEN rm.clean=0 && rm.occupied=1 THEN 1 ELSE 0 END) AS signed) AS dirtyOccupied, CAST(SUM(CASE WHEN rm.clean=0 && rm.occupied=0 THEN 1 ELSE 0 END) AS signed) AS dirtyVacant FROM rooms AS rm WHERE rm.active=1;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAvailableRoomListByDate: async (paramsObj) => {
        try {
            const queryString = 'SET @input_date=?;SELECT rm.room_id, rm.room_num, rm.room_type_id, rm.clean, rm.occupied, IFNULL(ae.avail, "n/a") AS availability_ends FROM rooms AS rm LEFT JOIN (SELECT room_id, MIN(check_in_date) AS avail FROM res_rooms WHERE check_in_date>@input_date && room_id IS NOT NULL GROUP BY room_id) AS ae ON rm.room_id=ae.room_id WHERE rm.active=1 && rm.room_id NOT IN (SELECT room_id FROM res_rooms WHERE room_id IS NOT NULL && check_in_date<=@input_date && check_out_date>@input_date);';
            const queryParams = [
                paramsObj.date,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result[1], null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewRoom: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO rooms (room_num, room_type_id, description, num_beds, clean, occupied, active) VALUES (?, ?, ?, ?, ?, ?, ?);';
            const queryParams = [
                paramsObj.room_num,
                paramsObj.room_type_id,
                paramsObj.description,
                paramsObj.num_beds,
                paramsObj.clean,
                paramsObj.occupied,
                paramsObj.active,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateRoomById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE rooms SET room_num=?, room_type_id=?, description=?, num_beds=?, clean=?, occupied=?, active=? WHERE room_id=?;';
            const queryParams = [
                paramsObj.room_num,
                paramsObj.room_type_id,
                paramsObj.description,
                paramsObj.num_beds,
                paramsObj.clean,
                paramsObj.occupied,
                paramsObj.active,
                paramsObj.room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateRoomOccupiedById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE rooms SET occupied=? WHERE room_id=?;';
            const queryParams = [
                paramsObj.occupied,
                paramsObj.room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateRoomCheckedOutById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE rooms SET occupied=0, clean=0 WHERE room_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateRoomCleanById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE rooms SET clean=? WHERE room_id=?;';
            const queryParams = [
                paramsObj.clean,
                paramsObj.room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteRoomById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM rooms WHERE room_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getRoomsHousekeepingStatus: async (paramsObj) => {
        try {
            const queryString = 'SELECT rm.room_num, rm.clean, rm.occupied, rm.active, rt.type, rr.checked_in, rr.checked_out, rr.room_id, CASE WHEN rr.check_out_date=CURDATE() THEN ("Due Out") END AS departure, CASE WHEN rr.check_in_date<CURDATE() && rr.check_out_date>CURDATE() THEN ("Stay Over") END AS stayover FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id LEFT JOIN res_rooms AS rr ON rm.room_id=rr.room_id && rr.active=1 WHERE (rm.active=? || rm.active=?) && (rm.clean=? || rm.clean=?) && (rm.occupied=? || rm.occupied=?)' + paramsObj.extraConditions + ' GROUP BY rm.room_id ORDER BY rm.room_id ASC;';
            const queryParams = [
                paramsObj.active,
                paramsObj.active2,
                paramsObj.clean,
                paramsObj.clean2,
                paramsObj.occupied,
                paramsObj.occupied2,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Room;
