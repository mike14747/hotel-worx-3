const connection = require('./connection');

const queryPromiseForPassport = (queryString, queryParams) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, queryParams, (err, result) => {
            if (err) return reject(err, false);
            resolve(null, result);
        });
    });
};

module.exports = queryPromiseForPassport;
