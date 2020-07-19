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
        try {
            const queryString = 'INSERT INTO access_levels (access_level, access_type) VALUES(?, ?);';
            const queryParams = [
                paramsObj.access_level,
                paramsObj.access_type,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateAccessLevel: async (paramsObj) => {
        try {
            const queryString = 'UPDATE access_levels SET access_level=?, access_type=? WHERE access_id=?;';
            const queryParams = [
                paramsObj.access_level,
                paramsObj.access_type,
                paramsObj.access_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
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
