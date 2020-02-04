const pool = require('../config/pool.js');

const PaymentType = {
    getAllPaymentTypes: async () => {
        try {
            const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getPaymentTypeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt WHERE pt.payment_type_id=?;';
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
    addNewPaymentType: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO payment_types (payment_type) VALUES (?);';
            const queryParams = [
                paramsObj.payment_type,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updatePaymentTypeById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE payment_types SET payment_type=?, active=? WHERE payment_type_id=?;';
            const queryParams = [
                paramsObj.payment_type,
                paramsObj.active,
                paramsObj.payment_type_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deletePaymentTypeById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM payment_types WHERE payment_type_id=?;';
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

module.exports = PaymentType;
