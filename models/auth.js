const pool = require('../config/connectionPool.js').getDb();

const Auth = {
    getUserByIdPassport: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, a.access_level, a.access_type FROM users AS u INNER JOIN access_levels AS a USING (access_id) WHERE u.active=1 && u.user_id=? LIMIT 1;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getUserByUsernamePassport: async (paramsObj) => {
        try {
            const queryString = 'SELECT u.user_id, u.username, u.password, a.access_level, a.access_type FROM users AS u INNER JOIN access_levels AS a USING (access_id) WHERE u.active=1 && u.username=? LIMIT 1;';
            const queryParams = [
                paramsObj.username,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Auth;
