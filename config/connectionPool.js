const mysql = require('mysql2/promise');

let pool;

const mysqlConnect = () => {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
    });
    return new Promise((resolve, reject) => {
        pool.query('SELECT 1', (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
};

const getDb = () => pool;

module.exports = { mysqlConnect, getDb };
