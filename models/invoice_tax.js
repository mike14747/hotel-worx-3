const queryPromise = require('../config/queryPromise');

const InvoiceTax = {
    getTaxesByInvoiceId: (id) => {
        const queryString = 'SELECT it.invoice_tax_id, it.invoice_id, t.tax_name, it.tax_amount FROM invoice_taxes AS it INNER JOIN taxes AS t ON it.tax_id=t.tax_id WHERE it.invoice_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    addNewInvoiceTaxes: (paramsArr) => {
        const queryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES ?;';
        const queryParams = [paramsArr];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = InvoiceTax;
