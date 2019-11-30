const connection = require('./connection');

const queryPromiseNoParams = (queryString) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = queryPromiseNoParams;
