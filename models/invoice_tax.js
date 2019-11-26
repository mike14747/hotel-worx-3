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
    addNewInvoiceTaxes: (paramsArr) => {
        const queryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES ?;';
        const queryParams = [paramsArr];
        return new Promise((resolve, reject) => {
            connection.query(queryString, queryParams, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
};

module.exports = InvoiceTax;
