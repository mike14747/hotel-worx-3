const pool = require('../config/connectionPool.js').getDb();

const Charge = {
    getAllCharges: async () => {
        try {
            const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.res_room_id, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getChargeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.res_room_id, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE charge_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getChargesByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE res_room_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewCharge: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO charges (res_room_id, charge_type_id, charge_amount, taxable) VALUES(?, ?, ?, ?);';
            const queryParams = [
                paramsObj.res_room_id,
                paramsObj.charge_type_id,
                paramsObj.charge_amount,
                paramsObj.taxable,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateChargeById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE charges SET res_room_id=?, charge_type_id=?, charge_amount=?, taxable=? WHERE charge_id=?;';
            const queryParams = [
                paramsObj.res_room_id,
                paramsObj.charge_type_id,
                paramsObj.charge_amount,
                paramsObj.taxable,
                paramsObj.charge_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteChargeById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM charges WHERE charge_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteChargesByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM charges WHERE res_room_id=?;';
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

module.exports = Charge;
