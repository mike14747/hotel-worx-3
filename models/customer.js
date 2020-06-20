const pool = require('../config/connectionPool.js').getDb();

const Customer = {
    getAllCustomers: async () => {
        try {
            const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getCustomerById: async (paramsObj) => {
        try {
            const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c WHERE customer_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewCustomer: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO customers (first_name, last_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            const queryParams = [
                paramsObj.first_name,
                paramsObj.last_name,
                paramsObj.address,
                paramsObj.city,
                paramsObj.state,
                paramsObj.zip,
                paramsObj.country,
                paramsObj.email,
                paramsObj.phone,
                paramsObj.credit_card_num,
                paramsObj.cc_expiration,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateCustomerById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE customers SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=? WHERE customer_id=?;';
            const queryParams = [
                paramsObj.first_name,
                paramsObj.last_name,
                paramsObj.address,
                paramsObj.city,
                paramsObj.state,
                paramsObj.zip,
                paramsObj.country,
                paramsObj.email,
                paramsObj.phone,
                paramsObj.credit_card_num,
                paramsObj.cc_expiration,
                paramsObj.customer_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteCustomerById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM customers WHERE customer_id=?;';
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

module.exports = Customer;
