const connection = require('../config/connection');

const PaymentType = {
    getPaymentTypeId: (id, cb) => {
        const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt WHERE pt.paymeny_type_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getAllPaymentTypes: (cb) => {
        const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewPaymentType: (paramsObj, cb) => {
        const queryString = 'INSERT INTO payment_types (payment_type) VALUES (?);';
        const queryParams = [paramsObj.payment_type];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = PaymentType;
