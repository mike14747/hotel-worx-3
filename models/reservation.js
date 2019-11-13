const connection = require('../config/connection');

const Reservation = {
    addNewReservation: (paramsObj, cb) => {
        const queryString = 'INSERT INTO reservations (customer_id, user_id, comments) VALUES (?,?,?);';
        const queryParams = [paramsObj.customer_id, paramsObj.user_id, paramsObj.comments];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Reservation;
