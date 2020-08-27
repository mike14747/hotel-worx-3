const pool = require('../config/connectionPool.js').getDb();

const User = {
    getAllUsers: async () => {
        try {
            const queryString = 'SELECT u.user_id, u.username, a.access_id, a.access_level, a.access_type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id ORDER BY u.user_id ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserById: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, a.access_id, a.access_level, a.access_type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE u.user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    checkExistingUsername: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.username FROM users AS u WHERE username=? && user_id!=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
                paramsObj.user_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    checkUsernameExists: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.username FROM users AS u WHERE username=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewUser: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO users(username, password, access_id, active) VALUES(?, ?, ?, ?);';
            const queryParams = [
                paramsObj.username,
                paramsObj.password,
                paramsObj.access_id,
                paramsObj.active,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateUserById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE users SET username=?, password=?, access_id=?, active=? WHERE user_id=?;';
            const queryParams = [
                paramsObj.username,
                paramsObj.password,
                paramsObj.access_id,
                paramsObj.active,
                paramsObj.user_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteUserById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM users WHERE user_id=?;';
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

module.exports = User;
