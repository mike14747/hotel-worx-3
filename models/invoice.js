const connection = require('../config/connection');

const Invoice = {
    deleteInvoiceById: (id, cb) => {
        const queryString = 'DELETE FROM invoices WHERE invoice_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Invoice;
