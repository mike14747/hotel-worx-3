const pool = require('../config/connectionPool.js').getDb();

const InvoiceTax = {
    getTaxesByInvoiceId: async (paramsObj) => {
        try {
            const queryString = 'SELECT it.invoice_tax_id, it.invoice_id, t.tax_name, it.tax_amount FROM invoice_taxes AS it INNER JOIN taxes AS t ON it.tax_id=t.tax_id WHERE it.invoice_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewInvoiceTaxes: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES ?;';
            const queryParams = [
                paramsObj.invoiceTaxesArray,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = InvoiceTax;
