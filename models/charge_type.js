const pool = require('../config/pool.js');

const ChargeType = {
    getAllChargeTypes: async () => {
        try {
            const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getChargeTypeById: async (paramsObj) => {
        try {
            const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct WHERE charge_type_id=? LIMIT 1;';
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
    addNewChargeType: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO charge_types (charge_type) VALUES(?);';
            const queryParams = [
                paramsObj.charge_type,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
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
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteChargeTypeById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM charge_types WHERE charge_type_id=?;';
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

module.exports = ChargeType;
