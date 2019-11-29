const connection = require('../config/connection');

const InvoicePayment = {
    getPaymentsByInvoiceId: (id, cb) => {
        const queryString = 'SELECT ip.invoice_payment_id, ip.invoice_id, pt.payment_type, ip.payment_amount, ip.payment_ref_num FROM invoice_payments AS ip INNER JOIN payment_types AS pt ON ip.payment_type_id=pt.payment_type_id WHERE ip.invoice_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewInvoicePayments: (paramsArr) => {
        const queryString = 'INSERT INTO invoice_payments (invoice_id, payment_type_id, payment_amount, payment_ref_num) VALUES ?;';
        const queryParams = [paramsArr];
        return new Promise((resolve, reject) => {
            connection.query(queryString, queryParams, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
};

module.exports = InvoicePayment;