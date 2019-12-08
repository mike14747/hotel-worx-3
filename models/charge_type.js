const pool = require('../config/pool.js');

const ChargeType = {
    getAllChargeTypes: async () => {
        const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getChargeTypeById: async (id) => {
        const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct WHERE charge_type_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewChargeType: async (paramsObj) => {
        const queryString = 'INSERT INTO charge_types (charge_type) VALUES(?);';
        const queryParams = [paramsObj.charge_type];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateChargeTypeById: async (paramsObj) => {
        const queryString = 'UPDATE charge_types SET charge_type=?, active=? WHERE charge_type_id=?;';
        const queryParams = [paramsObj.charge_type, paramsObj.active, paramsObj.charge_type_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteChargeTypeById: async (id) => {
        const queryString = 'DELETE FROM charge_types WHERE charge_type_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = ChargeType;
