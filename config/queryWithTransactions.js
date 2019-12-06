// const connection = require('./connection');
const pool = require('./pool.js');

const queryWithTransactions = (queryString, queryParams) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) return reject(err);
            pool.query(queryString, queryParams, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
            pool.releaseConnection(conn);
        });
    });
};

module.exports = queryWithTransactions;
