const pool = require('../config/connectionPool.js').getDb();

const Invoice = {
    getAllInvoices: async () => {
        try {
            const queryString = 'SELECT i.invoice_id, i.res_room_id, i.total_due, i.created_at FROM invoices AS i ORDER BY i.invoice_id ASC;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getInvoiceById: async (paramsObj) => {
        try {
            const queryString = 'SELECT i.invoice_id, i.res_room_id, i.total_due, DATEDIFF(rr.check_out_date, rr.check_in_date) AS num_nights, rr.reservation_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, "%b %d, %Y") AS check_in_date, DATE_FORMAT(rr.check_out_date, "%b %d, %Y") AS check_out_date, rr.adults, rr.room_id, rr.rate, rr.confirmation_code, rr.comments AS res_room_comments, rm.room_num, rt.type, r.customer_id, r.company_id, r.comments AS reservation_comments, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.country, c.email, c.phone, SUBSTRING(c.credit_card_num, -4) AS creditCardLastFour, c.cc_expiration, co.company_name FROM invoices AS i INNER JOIN res_rooms AS rr ON i.res_room_id=rr.res_room_id INNER JOIN rooms AS rm ON rr.room_id=rm.room_id INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id INNER JOIN reservations AS r ON r.reservation_id=rr.reservation_id INNER JOIN customers AS c on r.customer_id=c.customer_id LEFT JOIN companies AS co ON r.company_id=co.company_id WHERE i.invoice_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewInvoice: async (paramsObj) => {
        const connection = await pool.getConnection();
        try {
            const { invoiceObj, invoiceTaxesArr, invoicePaymentsArr } = { ...paramsObj };
            const invoiceQueryString = 'INSERT INTO invoices (res_room_id, total_due) VALUES (?, ?);';
            const invoiceParams = [invoiceObj.res_room_id, invoiceObj.total_due];
            const resRoomQueryString = 'UPDATE res_rooms SET checked_out=1 WHERE res_room_id=?;';
            const resRoomParams = [invoiceObj.res_room_id];
            const roomIdString = 'SELECT rr.room_id FROM res_rooms AS rr WHERE rr.res_room_id=? LIMIT 1;';
            const roomOccupiedString = 'UPDATE rooms SET occupied=0, clean=0 WHERE room_id=?;';
            await connection.beginTransaction();
            const [invoiceResult] = await connection.query(invoiceQueryString, invoiceParams);
            const invoiceTaxesArr2 = invoiceTaxesArr.map((tax) => {
                return [invoiceResult.insertId, tax.tax_id, tax.tax_amount];
            });
            const invoiceTaxesQueryString = 'INSERT INTO invoice_taxes (invoice_id, tax_id, tax_amount) VALUES ?;';
            const invoicePaymentsArr2 = invoicePaymentsArr.map((payment) => {
                return [invoiceResult.insertId, payment.payment_type_id, payment.payment_amount, payment.payment_ref_num];
            });
            const invoicePaymentsQueryString = 'INSERT INTO invoice_payments (invoice_id, payment_type_id, payment_amount, payment_ref_num) VALUES ?;';
            await Promise.all([
                connection.query(invoiceTaxesQueryString, [invoiceTaxesArr2]),
                connection.query(invoicePaymentsQueryString, [invoicePaymentsArr2]),
                connection.query(resRoomQueryString, resRoomParams),
            ]);
            const [roomIdResult] = await connection.query(roomIdString, resRoomParams);
            await connection.query(roomOccupiedString, [roomIdResult[0].room_id]);
            await connection.commit();
            return [invoiceResult, null];
        } catch (error) {
            await connection.rollback();
            return [null, error];
        } finally {
            await connection.release();
        }
    },
    deleteInvoiceById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM invoices WHERE invoice_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Invoice;
