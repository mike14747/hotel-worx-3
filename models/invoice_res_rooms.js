const connection = require('../config/connection');

const InvoiceResRoom = {
    getResRoomsByInvoiceId: (id, cb) => {
        const queryString = 'SELECT ir.invoice_res_room_id, ir.invoice_id, ir.res_room_id FROM invoice_res_rooms AS ir WHERE ir.invoice_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewInvoiceResRooms: (paramsObj, cb) => {
        const queryString = 'INSERT INTO invoice_res_rooms (invoice_id, res_room_id) VALUES (?,?);';
        const queryParams = [paramsObj.invoice_id, paramsObj.res_room_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = InvoiceResRoom;
