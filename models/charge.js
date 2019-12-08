const pool = require('../config/pool.js');

const Charge = {
    getAllCharges: async () => {
        const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getChargeById: async (id) => {
        const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE charge_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    getChargesByResRoomId: async (id) => {
        const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE res_room_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewCharge: async (paramsObj) => {
        const queryString = 'INSERT INTO charges (res_room_id, charge_type_id, charge_amount, taxable) VALUES(?, ?, ?, ?);';
        const queryParams = [paramsObj.res_room_id, paramsObj.charge_type_id, paramsObj.charge_amount, paramsObj.taxable];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateChargeById: async (paramsObj) => {
        const queryString = 'UPDATE charges SET charge_type_id=?, charge_amount=?, taxable=? WHERE charge_id=?;';
        const queryParams = [paramsObj.charge_type_id, paramsObj.charge_amount, paramsObj.taxable, paramsObj.charge_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteChargeById: async (id) => {
        const queryString = 'DELETE FROM charges WHERE charge_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteChargesByResRoomId: async (id) => {
        const queryString = 'DELETE FROM charges WHERE res_room_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Charge;
