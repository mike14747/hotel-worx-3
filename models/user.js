const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');
const queryPromiseForPassport = require('../config/queryPromiseForPassport');

const User = {
    getAllUsers: () => {
        const queryString = 'SELECT u.user_id, u.username, a.type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id;';
        return queryPromiseNoParams(queryString);
    },
    getUserById: (id) => {
        const queryString = 'SELECT u.user_id, u.username, a.type, u.active FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    getUserByIdForPassport: (id) => {
        const queryString = 'SELECT u.user_id, u.username, u.access_id FROM users AS u WHERE u.user_id=? LIMIT 1;';
        const queryParams = [id];
        return queryPromiseForPassport(queryString, queryParams);
    },
    getUserByUsernameForPassport: (username) => {
        const queryString = 'SELECT u.user_id, u.username, u.password, u.access_id FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        return queryPromiseForPassport(queryString, queryParams);
    },
    checkExistingUsername: (username) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? LIMIT 1;';
        const queryParams = [username];
        return queryPromise(queryString, queryParams);
    },
    checkUsernameForUpdate: (paramsObj) => {
        const queryString = 'SELECT u.username FROM users AS u WHERE username=? && user_id!=? LIMIT 1;';
        const queryParams = [paramsObj.username, paramsObj.user_id];
        return queryPromise(queryString, queryParams);
    },
    addNewUser: (paramsObj) => {
        const queryString = 'INSERT INTO users(username, password, access_id, active) VALUES(?, ?, ?, ?);';
        const queryParams = [paramsObj.username, paramsObj.password, paramsObj.access_id, paramsObj.active];
        return queryPromise(queryString, queryParams);
    },
    updateUserById: (paramsObj) => {
        console.log(paramsObj.user_id);
        const queryString = 'UPDATE users SET username=?, password=?, access_id=?, active=? WHERE user_id=?;';
        const queryParams = [paramsObj.username, paramsObj.password, paramsObj.access_id, paramsObj.active, paramsObj.user_id];
        return queryPromise(queryString, queryParams);
    },
    deleteUserById: (id) => {
        const queryString = 'DELETE FROM users WHERE user_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = User;
