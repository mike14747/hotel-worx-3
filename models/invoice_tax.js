// the controller(s) that use this model's addNewInvoiceTaxes method needs to send the paramsArr inside an object as invoiceTaxesArr

const pool = require('../config/pool.js');

const InvoiceTax = {
    getTaxesByInvoiceId: async (paramsObj) => {
        try {
            const queryString = 'SELECT it.invoice_tax_id, it.invoice_id, t.tax_name, it.tax_amount FROM invoice_taxes AS it INNER JOIN taxes AS t ON it.tax_id=t.tax_id WHERE it.invoice_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addNewInvoiceTaxes: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES ?;';
            const queryParams = [
                paramsObj.invoiceTaxesArr,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};

module.exports = InvoiceTax;
