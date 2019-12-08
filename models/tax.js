const pool = require('../config/pool.js');

const Tax = {
    getAllTaxes: async () => {
        const queryString = 'SELECT t.tax_id, t.tax_name, t.tax_rate FROM taxes AS t;';
        const [result] = await pool.query(queryString);
        console.log(result);
        return result;
    },
    getTaxById: async (id) => {
        const queryString = 'SELECT t.tax_id, t.tax_name, t.tax_rate FROM taxes AS t WHERE t.tax_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewTax: async (paramsObj) => {
        const queryString = 'INSERT INTO taxes (tax_name, tax_rate) VALUES (?, ?);';
        const queryParams = [paramsObj.tax_name, paramsObj.tax_rate];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateTaxById: async (paramsObj) => {
        const queryString = 'UPDATE taxes SET tax_name=?, tax_rate=?, active=? WHERE tax_id=?;';
        const queryParams = [paramsObj.tax_name, paramsObj.tax_rate, paramsObj.active, paramsObj.tax_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteTaxById: async (id) => {
        const queryString = 'DELETE FROM taxes WHERE tax_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Tax;
