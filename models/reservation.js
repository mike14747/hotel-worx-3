const connection = require('../config/connection');

const Reservation = {
    getAllReservations: (cb) => {
        const queryString = 'SELECT r.reservation_id, r.active, c.first_name, c.last_name, rt.type, rr.res_room_id, DATE_FORMAT(r.created_at, "%b %d, %Y (%h:%i %p)") AS created_at, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id INNER JOIN res_rooms AS rr ON r.reservation_id=rr.reservation_id INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id ORDER BY r.reservation_id ASC, rr.res_room_id ASC;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getReservationById: (id, cb) => {
        const queryString = 'SELECT r.reservation_id, r.customer_id, r.user_id, DATE_FORMAT(r.created_at, "%b %d, %Y (%h:%i %p)") AS created_at, r.comments, r.active, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS ccLastFour, c.cc_expiration FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id WHERE r.reservation_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewReservation: (paramsObj, cb) => {
        const queryString = 'INSERT INTO reservations (customer_id, user_id, comments) VALUES (?,?,?);';
        const queryParams = [paramsObj.customer_id, paramsObj.user_id, paramsObj.comments];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateReservationActiveById: (paramsObj, cb) => {
        const queryString = 'UPDATE reservations SET active=? WHERE reservation_id=?;';
        const queryParams = [paramsObj.active, paramsObj.reservation_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Reservation;
