const pool = require('../config/pool.js');

const InvoicePayment = {
    getPaymentsByInvoiceId: async (id) => {
        const queryString = 'SELECT ip.invoice_payment_id, ip.invoice_id, pt.payment_type, ip.payment_amount, ip.payment_ref_num FROM invoice_payments AS ip INNER JOIN payment_types AS pt ON ip.payment_type_id=pt.payment_type_id WHERE ip.invoice_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewInvoicePayments: async (paramsArr) => {
        const queryString = 'INSERT INTO invoice_payments (invoice_id, payment_type_id, payment_amount, payment_ref_num) VALUES ?;';
        const queryParams = [paramsArr];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = InvoicePayment;
