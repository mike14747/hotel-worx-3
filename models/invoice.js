const connection = require('../config/connection');

const Invoice = {
    addNewInvoice: (paramsObj, cb) => {
        const queryString = 'INSERT INTO invoices (res_room_id, num_nights, rate, total_due) VALUES (?, ?, ?, ?);';
        const queryParams = [paramsObj.res_room_id, paramsObj.num_nights, paramsObj.rate, paramsObj.total_due];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
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
