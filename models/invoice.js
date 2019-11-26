const connection = require('../config/connection');

const Invoice = {
    addNewInvoice: (paramsObj) => {
        const queryString = 'INSERT INTO invoices (res_room_id, num_nights, rate, total_due) VALUES (?, ?, ?, ?);';
        const queryParams = [paramsObj.res_room_id, paramsObj.num_nights, paramsObj.rate, paramsObj.total_due];
        return new Promise((resolve, reject) => {
            connection.execute(queryString, queryParams, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
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
