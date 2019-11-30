const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const Generic = {
    getAllGenerics: () => {
        const queryString = 'SELECT some_field FROM some_table AS some_alias;';
        return queryPromiseNoParams(queryString);
    },
    getGenericById: (id) => {
        const queryString = 'SELECT some_field FROM some_table AS some_alias WHERE some_condition=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    addNewGeneric: (paramsObj) => {
        const queryString = 'INSERT INTO generic (generic_id, generic_field) VALUES (?, ?);';
        const queryParams = [paramsObj.generic_id, paramsObj.generic_field];
        return queryPromise(queryString, queryParams);
    },
    updateGenericById: (paramsObj) => {
        const queryString = 'UPDATE generic SET generic_field=? WHERE generic_id=?;';
        const queryParams = [paramsObj.generic_field, paramsObj.generic_id];
        return queryPromise(queryString, queryParams);
    },
    deleteGenericById: (id) => {
        const queryString = 'DELETE FROM generic WHERE generic_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    // test methods
    getAllTestGenerics: () => {
        const queryString = 'SELECT c.first_name, c.last_name FROM customers AS c;';
        return queryPromise(queryString);
    },
    getTestGenericById: (id) => {
        const queryString = 'SELECT c.first_name, c.last_name FROM customers AS c WHERE c.customer_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = Generic;
