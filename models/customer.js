const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const Customer = {
    getAllCustomers: () => {
        const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c;';
        return queryPromiseNoParams(queryString);
    },
    getCustomerById: (id) => {
        const queryString = 'SELECT c.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration FROM customers AS c WHERE customer_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    addNewCustomer: (paramsObj) => {
        const queryString = 'INSERT INTO customers (first_name, last_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const queryParams = [paramsObj.first_name, paramsObj.last_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration];
        return queryPromise(queryString, queryParams);
    },
    updateCustomerById: (paramsObj) => {
        const queryString = 'UPDATE customers SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=? WHERE customer_id=?;';
        const queryParams = [paramsObj.first_name, paramsObj.last_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration, paramsObj.customer_id];
        return queryPromise(queryString, queryParams);
    },
    deleteCustomerById: (id) => {
        const queryString = 'DELETE FROM customers WHERE customer_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = Customer;
