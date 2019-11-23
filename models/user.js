const connection = require('../config/connection');

const User = {
    getAllUsers: (cb) => {
        const queryString = 'SELECT u.user_id, u.username, a.type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getUserById: (id, cb) => {
        const queryString = 'SELECT u.user_id, u.username, a.type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getUserByIdForPassport: (id, cb) => {
        const queryString = 'SELECT u.user_id, u.username, u.access_id FROM users AS u WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) cb(err, false);
            cb(null, result);
        });
    },
    getUserByUsernameForPassport: (username, cb) => {
        const queryString = 'SELECT u.user_id, u.username, u.password, u.access_id FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) cb(err, false);
            cb(null, result);
        });
    },
    checkExistingUsername: (username, cb) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    checkUsernameForUpdate: (paramsObj, cb) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? && user_id!=? LIMIT 1;';
        const queryParams = [paramsObj.username, paramsObj.user_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewUser: (paramsObj, cb) => {
        const queryString = 'INSERT INTO users(username, password, access_id, active) VALUES(?, ?, ?, ?);';
        const queryParams = [paramsObj.username, paramsObj.password, paramsObj.access_id, paramsObj.active];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateUserById: (paramsObj, cb) => {
        console.log(paramsObj.user_id);
        const queryString = 'UPDATE users SET username=?, password=?, access_id=?, active=? WHERE user_id=?;';
        const queryParams = [paramsObj.username, paramsObj.password, paramsObj.access_id, paramsObj.active, paramsObj.user_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteUserById: (id, cb) => {
        const queryString = 'DELETE FROM users WHERE user_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = User;
