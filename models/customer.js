const pool = require('../config/pool.js');

const Customer = {
    getAllCustomers: async () => {
        const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getCustomerById: async (id) => {
        const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c WHERE customer_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewCustomer: async (paramsObj) => {
        const queryString = 'INSERT INTO customers (first_name, last_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const queryParams = [paramsObj.first_name, paramsObj.last_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateCustomerById: async (paramsObj) => {
        const queryString = 'UPDATE customers SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=? WHERE customer_id=?;';
        const queryParams = [paramsObj.first_name, paramsObj.last_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration, paramsObj.customer_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteCustomerById: async (id) => {
        const queryString = 'DELETE FROM customers WHERE customer_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Customer;
