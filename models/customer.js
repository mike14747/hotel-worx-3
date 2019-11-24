const connection = require('../config/connection');

const Customer = {
    getAllCustomers: (cb) => {
        const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getCustomerById: (id, cb) => {
        const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c WHERE customer_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewCustomer: (paramsObj, cb) => {
        const queryString = 'INSERT INTO customers (first_name, last_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const queryParams = [paramsObj.first_name, paramsObj.last_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateCustomerById: (paramsObj, cb) => {
        const queryString = 'UPDATE customers SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=? WHERE customer_id=?;';
        const queryParams = [paramsObj.first_name, paramsObj.last_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration, paramsObj.customer_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteCustomerById: (id, cb) => {
        const queryString = 'DELETE FROM customers WHERE customer_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Customer;
