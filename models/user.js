const pool = require('../config/pool.js');

const User = {
    getAllUsers: async () => {
        const queryString = 'SELECT u.user_id, u.username, a.type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getUserById: async (id) => {
        const queryString = 'SELECT u.user_id, u.username, a.type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    checkExistingUsername: async (username) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    checkUsernameForUpdate: async (paramsObj) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? && user_id!=? LIMIT 1;';
        const queryParams = [paramsObj.username, paramsObj.user_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewUser: async (paramsObj) => {
        const queryString = 'INSERT INTO users(username, password, access_id, active) VALUES(?, ?, ?, ?);';
        const queryParams = [paramsObj.username, paramsObj.password, paramsObj.access_id, paramsObj.active];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateUserById: async (paramsObj) => {
        const queryString = 'UPDATE users SET username=?, password=?, access_id=?, active=? WHERE user_id=?;';
        const queryParams = [paramsObj.username, paramsObj.password, paramsObj.access_id, paramsObj.active, paramsObj.user_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteUserById: async (id) => {
        const queryString = 'DELETE FROM users WHERE user_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = User;
