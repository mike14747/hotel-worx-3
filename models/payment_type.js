const pool = require('../config/pool.js');

const PaymentType = {
    getAllPaymentTypes: async () => {
        const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getPaymentTypeById: async (id) => {
        const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt WHERE pt.payment_type_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewPaymentType: async (paramsObj) => {
        const queryString = 'INSERT INTO payment_types (payment_type) VALUES (?);';
        const queryParams = [paramsObj.payment_type];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updatePaymentTypeById: async (paramsObj) => {
        const queryString = 'UPDATE payment_types SET payment_type=?, active=? WHERE payment_type_id=?;';
        const queryParams = [paramsObj.payment_type, paramsObj.active, paramsObj.payment_type_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deletePaymentTypeById: async (id) => {
        const queryString = 'DELETE FROM payment_types WHERE payment_type_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = PaymentType;
