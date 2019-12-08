const pool = require('../config/pool.js');

const InvoiceTax = {
    getTaxesByInvoiceId: async (id) => {
        const queryString = 'SELECT it.invoice_tax_id, it.invoice_id, t.tax_name, it.tax_amount FROM invoice_taxes AS it INNER JOIN taxes AS t ON it.tax_id=t.tax_id WHERE it.invoice_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewInvoiceTaxes: async (paramsArr) => {
        const queryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES ?;';
        const queryParams = [paramsArr];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = InvoiceTax;
