const connection = require('./connection');

const queryPromise = (queryString, queryParams) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, queryParams, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = queryPromise;
