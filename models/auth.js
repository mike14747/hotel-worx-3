const pool = require('../config/pool.js');

const Auth = {
    getUserByIdForPassport: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, u.access_id FROM users AS u WHERE u.user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return (null, result);
        } catch (error) {
            console.log(error);
            return (error, false);
        }
    },
    getUserByUsernameForPassport: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, u.password, u.access_id FROM users AS u WHERE username=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return (null, result);
        } catch (error) {
            console.log(error);
            return (error, false);
        }
    },
};

module.exports = Auth;
