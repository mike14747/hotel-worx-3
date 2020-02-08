const pool = require('../config/pool.js');

const RoomType = {
    getAllRoomTypes: async () => {
        try {
            const queryString = 'SELECT rt.room_type_id, rt.type, rt.rate FROM room_types AS rt ORDER BY rt.room_type_id ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getRoomTypeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT rt.room_type_id, rt.type, rt.rate FROM room_types AS rt WHERE rt.room_type_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getRoomTypeAvailability: async (paramsObj) => {
        try {
            const daysToShow = 14;
            let queryString = 'SET @input_date=?;';
            for (let i = 0; i < daysToShow; i++) {
                i > 0 && (queryString += ' UNION ALL ');
                queryString += 'SELECT rm3.date, CAST(COALESCE(SUM(rm3.ra1), 0) AS UNSIGNED) AS AvailableType1, CAST(COALESCE(SUM(rm3.ra2), 0) AS UNSIGNED) AS AvailableType2, CAST(COALESCE(SUM(rm3.ra3), 0) AS UNSIGNED) AS AvailableType3, CAST((COALESCE(SUM(rm3.ra1), 0) + COALESCE(SUM(rm3.ra2), 0) + COALESCE(SUM(rm3.ra3), 0)) AS UNSIGNED) AS TotalAvailable, CAST(COALESCE(SUM(rm3.ro1), 0) AS UNSIGNED) AS OccupiedType1, CAST(COALESCE(SUM(rm3.ro2), 0) AS UNSIGNED) AS OccupiedType2, CAST(COALESCE(SUM(rm3.ro3), 0) AS UNSIGNED) AS OccupiedType3, CAST((COALESCE(SUM(rm3.ro1), 0) + COALESCE(SUM(rm3.ro2), 0) + COALESCE(SUM(rm3.ro3), 0)) AS UNSIGNED) AS TotalOccupied FROM (SELECT (DATE_ADD(@input_date, INTERVAL ' + i + ' DAY)) AS date, CASE WHEN rm2.room_type_id=1 THEN rm2.available_types END AS ra1, CASE WHEN rm2.room_type_id=2 THEN rm2.available_types END AS ra2, CASE WHEN rm2.room_type_id=3 THEN rm2.available_types END AS ra3, CASE WHEN rm2.room_type_id=1 THEN rm2.used_types END AS ro1, CASE WHEN rm2.room_type_id=2 THEN rm2.used_types END AS ro2, CASE WHEN rm2.room_type_id=3 THEN rm2.used_types END AS ro3 FROM (SELECT rm1.room_type_id, COALESCE(rm1.total_types, 0)-COALESCE(rr1.used_types, 0) AS available_types, COALESCE(rr1.used_types, 0) AS used_types FROM room_types AS rt LEFT JOIN (SELECT rr.room_type_id, COUNT(*) AS used_types FROM res_rooms AS rr WHERE rr.active=1 && rr.check_in_date<=DATE_ADD(@input_date, INTERVAL ' + i + ' DAY) && rr.check_out_date>DATE_ADD(@input_date, INTERVAL ' + i + ' DAY) GROUP BY rr.room_type_id) AS rr1 ON rt.room_type_id=rr1.room_type_id LEFT JOIN (SELECT rm.room_type_id, COUNT(*) AS total_types FROM rooms AS rm WHERE rm.active=1 GROUP BY rm.room_type_id) AS rm1 ON rt.room_type_id=rm1.room_type_id GROUP BY rt.room_type_id ORDER BY rt.room_type_id ASC) AS rm2) AS rm3 GROUP BY rm3.date';
                i === daysToShow - 1 && (queryString += ';');
            }
            const queryParams = [
                paramsObj.date,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addNewRoomType: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO room_types (type, rate) VALUES (?, ?);';
            const queryParams = [
                paramsObj.type,
                paramsObj.rate,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateRoomTypeById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE room_types SET type=?, rate=? WHERE room_type_id=?;';
            const queryParams = [
                paramsObj.type,
                paramsObj.rate,
                paramsObj.room_type_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteRoomTypeById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM room_types WHERE room_type_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};

module.exports = RoomType;
