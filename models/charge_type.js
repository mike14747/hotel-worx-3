const connection = require('../config/connection');

const ChargeType = {
    getChargeTypeById: (id, cb) => {
        const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct WHERE charge_type_id=? LIMIT 1;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getAllChargeTypes: (cb) => {
        const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewChargeType: (paramsObj, cb) => {
        const queryString = 'INSERT INTO charge_types (charge_type) VALUES(?);';
        const queryParams = [paramsObj.charge_type];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateChargeTypeById: (paramsObj, cb) => {
        const queryString = 'UPDATE charge_types SET charge_type=?, active=? WHERE charge_type_id=?;';
        const queryParams = [paramsObj.charge_type, paramsObj.active, paramsObj.charge_type_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteChargeTypeById: (id, cb) => {
        const queryString = 'DELETE FROM charge_types WHERE charge_type_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = ChargeType;
