const pool = require('../config/pool.js');

const Generic = {
    getAllGenerics: async () => {
        const queryString = 'SELECT some_field FROM some_table AS some_alias;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getGenericById: async (id) => {
        const queryString = 'SELECT some_field FROM some_table AS some_alias WHERE some_condition=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewGeneric: async (paramsObj) => {
        const queryString = 'INSERT INTO generic (generic_id, generic_field) VALUES (?, ?);';
        const queryParams = [paramsObj.generic_id, paramsObj.generic_field];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateGenericById: async (paramsObj) => {
        const queryString = 'UPDATE generic SET generic_field=? WHERE generic_id=?;';
        const queryParams = [paramsObj.generic_field, paramsObj.generic_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteGenericById: async (id) => {
        const queryString = 'DELETE FROM generic WHERE generic_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    // test methods
    getAllTestGenerics: async () => {
        const queryString = 'SELECT c.first_name, c.last_name FROM customers AS c;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getTestGenericById: async (id) => {
        const queryString = 'SELECT c.first_name, c.last_name FROM customers AS c WHERE c.customer_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Generic;
