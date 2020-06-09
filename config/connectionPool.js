const mysql = require('mysql2/promise');

let pool;

const mysqlConnect = async () => {
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
    return pool;
};

const getDb = () => pool;

module.exports = { mysqlConnect, getDb };
