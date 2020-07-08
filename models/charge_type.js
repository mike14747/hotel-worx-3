const pool = require('../config/connectionPool.js').getDb();

const ChargeType = {
    getAllChargeTypes: async () => {
        try {
            const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getChargeTypeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct WHERE ct.charge_type_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getActiveChargeTypeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT ct.charge_type_id FROM charge_types AS ct WHERE ct.active=1 && ct.charge_type_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewChargeType: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO charge_types (charge_type) VALUES(?);';
            const queryParams = [
                paramsObj.charge_type,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateChargeTypeById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE charge_types SET charge_type=?, active=? WHERE charge_type_id=?;';
            const queryParams = [
                paramsObj.charge_type,
                paramsObj.active,
                paramsObj.charge_type_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteChargeTypeById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM charge_types WHERE charge_type_id=?;';
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

module.exports = ChargeType;
