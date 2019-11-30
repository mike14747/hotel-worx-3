const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const Invoice = {
    getAllInvoices: () => {
        const queryString = 'SELECT i.invoice_id, i.res_room_id, i.total_due, i.created_at FROM invoices AS i ORDER BY i.invoice_id ASC;';
        return queryPromiseNoParams(queryString);
    },
    getInvoiceById: (id) => {
        const queryString = 'SELECT i.invoice_id, i.res_room_id, i.total_due, DATEDIFF(rr.check_out_date, rr.check_in_date) AS num_nights, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments AS res_room_comments, rm.room_num, rt.type, r.customer_id, r.company_id, r.comments AS reservation_comments, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration, co.company_name FROM invoices AS i INNER JOIN res_rooms AS rr ON i.res_room_id=rr.res_room_id INNER JOIN rooms AS rm ON rr.room_id=rm.room_id INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id INNER JOIN reservations AS r ON r.reservation_id=rr.reservation_id INNER JOIN customers AS c on r.customer_id=c.customer_id LEFT JOIN companies AS co ON r.company_id=co.company_id WHERE i.invoice_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    addNewInvoice: (paramsObj) => {
        const queryString = 'INSERT INTO invoices (res_room_id, total_due) VALUES (?, ?);';
        const queryParams = [paramsObj.res_room_id, paramsObj.total_due];
        return queryPromise(queryString, queryParams);
    },
    deleteInvoiceById: (id) => {
        const queryString = 'DELETE FROM invoices WHERE invoice_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = Invoice;
