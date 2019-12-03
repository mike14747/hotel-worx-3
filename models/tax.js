const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const TaxRate = {
    getAllTaxRates: () => {
        const queryString = 'SELECT t.tax_name, t.tax_rate FROM taxes AS t;';
        return queryPromiseNoParams(queryString);
    },
    addNewTax: (paramsObj) => {
        const queryString = 'INSERT INTO taxes (tax_name, tax_rate) VALUES (?, ?);';
        const queryParams = [paramsObj.tax_name, paramsObj.tax_rate];
        return queryPromise(queryString, queryParams);
    },
    updateTaxById: (paramsObj) => {
        const queryString = 'UPDATE taxes SET tax_name=?, tax_rate=?, active=? WHERE tax_id=?;';
        const queryParams = [paramsObj.tax_name, paramsObj.tax_rate, paramsObj.active, paramsObj.tax_id];
        return queryPromise(queryString, queryParams);
    },
    deleteTaxById: (id) => {
        const queryString = 'DELETE FROM taxes WHERE tax_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = TaxRate;
