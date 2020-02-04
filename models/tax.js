const pool = require('../config/pool.js');

const Tax = {
    getAllTaxes: async () => {
        try {
            const queryString = 'SELECT t.tax_id, t.tax_name, t.tax_rate FROM taxes AS t;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getTaxById: async (paramsObj) => {
        try {
            const queryString = 'SELECT t.tax_id, t.tax_name, t.tax_rate FROM taxes AS t WHERE t.tax_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addNewTax: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO taxes (tax_name, tax_rate) VALUES (?, ?);';
            const queryParams = [
                paramsObj.tax_name,
                paramsObj.tax_rate,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
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
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteTaxById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM taxes WHERE tax_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};

module.exports = Tax;
