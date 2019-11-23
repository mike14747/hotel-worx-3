const connection = require('../config/connection');

const Charge = {
    getChargeById: (id, cb) => {
        const queryString = 'SELECT c.charge_id, ct.charge_type, c.charge_amount FROM charges AS c INNER JOIN charge_types AS ct ON c.charge_type_id=ct.charge_type_id WHERE charge_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getChargesByResRoomId: (id, cb) => {
        const queryString = 'SELECT c.charge_id, ct.charge_type, c.charge_amount FROM charges AS c INNER JOIN charge_types AS ct ON c.charge_type_id=ct.charge_type_id WHERE res_room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewCharge: (paramsObj, cb) => {
        const queryString = 'INSERT INTO charges (res_room_id, charge_type_id, charge_amount) VALUES(?,?,?);';
        const queryParams = [paramsObj.res_room_id, paramsObj.charge_type_id, paramsObj.charge_amount];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateChargeById: (paramsObj, cb) => {
        const queryString = 'UPDATE charges SET charge_type_id=?, charge_amount=? WHERE charge_id=?;';
        const queryParams = [paramsObj.charge_type_id, paramsObj.charge_amount, paramsObj.charge_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteChargeById: (id, cb) => {
        const queryString = 'DELETE FROM charges WHERE charge_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteChargesByResRoomId: (id, cb) => {
        const queryString = 'DELETE FROM charges WHERE res_room_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Charge;
