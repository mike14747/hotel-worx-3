const { PromisePool } = require('mysql2/promise');

const pool = require('../config/connectionPool.js').getDb();

const Tax = {
    getAllTaxes: async () => {
        try {
            const queryString = 'SELECT t.tax_id, t.tax_name, t.tax_rate, t.active FROM taxes AS t;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getTaxById: async (paramsObj) => {
        try {
            const queryString = 'SELECT t.tax_id, t.tax_name, t.tax_rate, t.active FROM taxes AS t WHERE t.tax_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewTax: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO taxes (tax_name, tax_rate, active) VALUES (?, ?, ?);';
            const queryParams = [
                paramsObj.tax_name,
                paramsObj.tax_rate,
                paramsObj.active,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateTaxById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE taxes SET tax_name=?, tax_rate=?, active=? WHERE tax_id=?;';
            const queryParams = [
                paramsObj.tax_name,
                paramsObj.tax_rate,
                paramsObj.active,
                paramsObj.tax_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteTaxById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM taxes WHERE tax_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Tax;
