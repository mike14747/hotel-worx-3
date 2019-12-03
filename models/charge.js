const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const Charge = {
    getAllCharges: () => {
        const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id;';
        return queryPromiseNoParams(queryString);
    },
    getChargeById: (id) => {
        const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE charge_id=? LIMIT 1;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    getChargesByResRoomId: (id) => {
        const queryString = 'SELECT ch.charge_id, ct.charge_type, ch.charge_amount, ch.taxable FROM charges AS ch INNER JOIN charge_types AS ct ON ch.charge_type_id=ct.charge_type_id WHERE res_room_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    addNewCharge: (paramsObj) => {
        const queryString = 'INSERT INTO charges (res_room_id, charge_type_id, charge_amount, taxable) VALUES(?, ?, ?, ?);';
        const queryParams = [paramsObj.res_room_id, paramsObj.charge_type_id, paramsObj.charge_amount, paramsObj.taxable];
        return queryPromise(queryString, queryParams);
    },
    updateChargeById: (paramsObj) => {
        const queryString = 'UPDATE charges SET charge_type_id=?, charge_amount=?, taxable=? WHERE charge_id=?;';
        const queryParams = [paramsObj.charge_type_id, paramsObj.charge_amount, paramsObj.taxable, paramsObj.charge_id];
        return queryPromise(queryString, queryParams);
    },
    deleteChargeById: (id) => {
        const queryString = 'DELETE FROM charges WHERE charge_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    deleteChargesByResRoomId: (id) => {
        const queryString = 'DELETE FROM charges WHERE res_room_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = Charge;
