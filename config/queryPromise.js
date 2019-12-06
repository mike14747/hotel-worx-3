// const connection = require('./connection');
const pool = require('./pool.js');

const queryPromise = (queryString, queryParams) => {
    return new Promise((resolve, reject) => {
        pool.query(queryString, queryParams, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = queryPromise;
