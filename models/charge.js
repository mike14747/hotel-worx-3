const pool = require('../config/pool.js');

const Charge = {
    getAllCharges: async () => {
        try {
            const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getChargeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE charge_id=? LIMIT 1;';
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
    getChargesByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE res_room_id=?;';
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
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateChargeById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE charges SET charge_type_id=?, charge_amount=?, taxable=? WHERE charge_id=?;';
            const queryParams = [
                paramsObj.charge_type_id,
                paramsObj.charge_amount,
                paramsObj.taxable,
                paramsObj.charge_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteChargeById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM charges WHERE charge_id=?;';
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
    deleteChargesByResRoomId: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM charges WHERE res_room_id=?;';
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

module.exports = Charge;
