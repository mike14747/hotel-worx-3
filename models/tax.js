const connection = require('../config/connection');

const TaxRate = {
    getAllTaxRates: (cb) => {
        const queryString = 'SELECT tr.tax_name, tr.tax_rate FROM tax_rates AS tr;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewTax: (paramsObj, cb) => {
        const queryString = 'INSERT INTO taxes (tax_name, tax_rate) VALUES (?,?);';
        const queryParams = [paramsObj.tax_name, paramsObj.tax_rate];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateTaxById: (paramsObj, cb) => {
        console.log(paramsObj);
        const queryString = 'UPDATE taxes SET tax_name=?, tax_rate=? WHERE tax_id=?;';
        const queryParams = [paramsObj.tax_name, paramsObj.tax_rate, paramsObj.tax_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteTaxById: (id, cb) => {
        const queryString = 'DELETE FROM taxes WHERE tax_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = TaxRate;
