const pool = require('../config/connectionPool').getDb();

const AccessLevel = {
    getAllAccessLevels: async () => {
        try {
            const queryString = 'SELECT access_id, access_level, access_type FROM access_levels ORDER BY access_level ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAccessLevelById: async (paramsObj) => {
        try {
            const queryString = 'SELECT access_id, access_level, access_type FROM access_levels WHERE access_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewAccessLevel: async (paramsObj) => {

    },
    updateAccessLevel: async (paramsObj) => {

    },
    deleteAccessLevel: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM access_levels WHERE access_id=?;';
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

module.exports = AccessLevel;
