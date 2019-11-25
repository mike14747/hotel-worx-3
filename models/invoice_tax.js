const connection = require('../config/connection');

const InvoiceTax = {
    getTaxesByInvoiceId: (id, cb) => {
        const queryString = 'SELECT it.invoice_tax_id, it.invoice_id, t.tax_name, it.tax_amount FROM invoice_taxes AS it INNER JOIN taxes AS t ON it.tax_id=t.tax_id WHERE it.invoice_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewInvoiceTaxes: (paramsObj) => {
        const queryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES (?, ?, ?);';
        const queryParams = [paramsObj.invoice_id, paramsObj.tax_id, paramsObj.tax_amount];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            return result;
        });
    },
};

module.exports = InvoiceTax;
