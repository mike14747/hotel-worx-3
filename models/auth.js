const connection = require('../config/connection');

const Auth = {
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
};

module.exports = Auth;
