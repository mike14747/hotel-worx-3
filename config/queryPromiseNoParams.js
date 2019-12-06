// const connection = require('./connection');
const pool = require('./pool.js');

const queryPromiseNoParams = (queryString) => {
    return new Promise((resolve, reject) => {
        pool.query(queryString, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = queryPromiseNoParams;
