const pool = require('../config/connectionPool.js').getDb();

const InvoicePayment = {
    getPaymentsByInvoiceId: async (paramsObj) => {
        try {
            const queryString = 'SELECT ip.invoice_payment_id, ip.invoice_id, pt.payment_type, ip.payment_amount, ip.payment_ref_num FROM invoice_payments AS ip INNER JOIN payment_types AS pt ON ip.payment_type_id=pt.payment_type_id WHERE ip.invoice_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewInvoicePayments: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO invoice_payments (invoice_id, payment_type_id, payment_amount, payment_ref_num) VALUES ?;';
            const queryParams = [
                paramsObj.invoicePaymentArray,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = InvoicePayment;
