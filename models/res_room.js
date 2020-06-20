// the controller(s) that use this model's addSomeResRooms need to send the resRooms array inside an object as resRooms

const pool = require('../config/connectionPool.js').getDb();

const ResRoom = {
    getAllResRooms: async () => {
        try {
            const queryString = 'SELECT rr.res_room_id, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments, rr.allow_charges, rr.active FROM res_rooms AS rr ORDER BY rr.res_room_id ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getResRoomByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'SELECT rr.res_room_id, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments, rr.allow_charges, rr.active FROM res_rooms AS rr WHERE rr.res_room_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getResRoomsByReservationId: async (paramsObj) => {
        try {
            const queryString = 'SELECT rr.res_room_id, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments, rr.allow_charges, rr.active FROM res_rooms AS rr WHERE rr.reservation_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getMaxCCodeByReservationId: async (paramsObj) => {
        try {
            const queryString = 'SELECT COUNT(*) AS totalRooms, (SELECT COUNT(*) FROM res_rooms WHERE reservation_id=? && !isnull(room_id)) AS numAssignedRooms, MAX(CONVERT(RIGHT(rr.confirmation_code, 3), UNSIGNED INTEGER)) AS currentMaxCCode FROM res_rooms AS rr WHERE rr.reservation_id=?;';
            const queryParams = [
                paramsObj.id,
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addSomeResRooms: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO res_rooms (reservation_id, room_type_id, check_in_date, check_out_date, adults, rate, confirmation_code, comments, allow_charges) VALUES ?;';
            const queryParams = [
                paramsObj.resRooms.map((resRoom) => {
                    return [
                        resRoom.reservation_id,
                        resRoom.room_type_id,
                        resRoom.check_in_date,
                        resRoom.check_out_date,
                        resRoom.adults,
                        resRoom.rate,
                        resRoom.confirmation_code,
                        resRoom.comments,
                        resRoom.allow_charges,
                    ];
                }),
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateResRoomInfoById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE res_rooms SET room_type_id=?, check_in_date=?, check_out_date=?, adults=?, rate=?, comments=?, allow_charges=? WHERE res_room_id=?;';
            const queryParams = [
                paramsObj.room_type_id,
                paramsObj.check_in_date,
                paramsObj.check_out_date,
                paramsObj.adults,
                paramsObj.rate,
                paramsObj.comments,
                paramsObj.allow_charges,
                paramsObj.res_room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateResRoomAssignById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE res_rooms SET room_type_id=?, room_id=?, rate=?, confirmation_code=? WHERE res_room_id=?;';
            const queryParams = [
                paramsObj.room_type_id,
                paramsObj.room_id,
                paramsObj.rate,
                paramsObj.confirmation_code,
                paramsObj.res_room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateResRoomReassignById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE res_rooms SET room_type_id=?, room_id=?, rate=? WHERE res_room_id=?;';
            const queryParams = [
                paramsObj.room_type_id,
                paramsObj.room_id,
                paramsObj.rate,
                paramsObj.res_room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateResRoomActiveByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'UPDATE res_rooms SET active=? WHERE res_room_id=?;';
            const queryParams = [
                paramsObj.active,
                paramsObj.res_room_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateResRoomActiveByReservationId: async (paramsObj) => {
        try {
            const queryString = 'UPDATE res_rooms SET active=? WHERE reservation_id=?;';
            const queryParams = [
                paramsObj.active,
                paramsObj.reservation_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteResRoomByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM res_rooms WHERE res_room_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteResRoomsByReservationId: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM res_rooms WHERE reservation_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = ResRoom;
