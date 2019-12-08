const pool = require('../config/pool.js');

const Reservation = {
    getAllReservations: async () => {
        const queryString = 'SELECT r.reservation_id, r.active, c.first_name, c.last_name, rt.type, rr.res_room_id, DATE_FORMAT(r.created_at, "%b %d, %Y (%h:%i %p)") AS created_at, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id INNER JOIN res_rooms AS rr ON r.reservation_id=rr.reservation_id INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id ORDER BY r.reservation_id ASC, rr.res_room_id ASC;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getReservationById: async (id) => {
        const queryString = 'SELECT r.reservation_id, r.customer_id, r.user_id, DATE_FORMAT(r.created_at, "%b %d, %Y (%h:%i %p)") AS created_at, r.comments, r.active, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS ccLastFour, c.cc_expiration FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id WHERE r.reservation_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewReservation: async (paramsObj) => {
        const { customerObj, reservationObj, resRoomsArr } = { ...paramsObj };
        const customerQueryString = 'INSERT INTO customers (first_name, last_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const customerParams = [customerObj.first_name, customerObj.last_name, customerObj.address, customerObj.city, customerObj.state, customerObj.zip, customerObj.country, customerObj.email, customerObj.phone, customerObj.credit_card_num, customerObj.cc_expiration];
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const customerResult = await connection.query(customerQueryString, customerParams);
            const reservationQueryString = 'INSERT INTO reservations (customer_id, company_id, user_id, comments) VALUES (?, ?, ?, ?);';
            const reservationParams = [customerResult[0].insertId, reservationObj.company_id, reservationObj.user_id, reservationObj.comments];
            const [reservationResult] = await connection.query(reservationQueryString, reservationParams);
            const resRoomQueryString = 'INSERT INTO res_rooms (reservation_id, room_type_id, check_in_date, check_out_date, adults, rate, confirmation_code, comments, allow_charges) VALUES ?;';
            const today = new Date();
            const confirmationCode = today.getFullYear().toString().substr(2) + (today.getMonth() + 1).toString() + today.getDate().toString() + reservationResult.insertId.toString().slice(-3) + '001';
            const resRoomQueryParams = [resRoomsArr.map((resRoom) => {
                return [reservationResult.insertId, resRoom.room_type_id, resRoom.check_in_date, resRoom.check_out_date, resRoom.adults, resRoom.rate, confirmationCode, resRoom.comments, resRoom.allow_charges];
            })];
            await connection.query(resRoomQueryString, resRoomQueryParams);
            await connection.commit();
            return reservationResult;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            await connection.release();
        }
    },
    addNewReservationOld: async (paramsObj) => {
        const queryString = 'INSERT INTO reservations (customer_id, company_id, user_id, comments) VALUES (?, ?, ?, ?);';
        const queryParams = [paramsObj.customer_id, paramsObj.company_id, paramsObj.user_id, paramsObj.comments];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateReservationById: async (paramsObj) => {
        const queryString = 'UPDATE reservations SET customer_id=?, company_id=?, user_id=?, comments=?, active=? WHERE reservation_id=?;';
        const queryParams = [paramsObj.customer_id, paramsObj.company_id, paramsObj.user_id, paramsObj.comments, paramsObj.active, paramsObj.reservation_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Reservation;
