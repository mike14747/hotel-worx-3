const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const ChargeType = {
    getChargeTypeById: (id) => {
        const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct WHERE charge_type_id=? LIMIT 1;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    getAllChargeTypes: () => {
        const queryString = 'SELECT ct.charge_type_id, ct.charge_type, ct.active FROM charge_types AS ct;';
        return queryPromiseNoParams(queryString);
    },
    addNewChargeType: (paramsObj) => {
        const queryString = 'INSERT INTO charge_types (charge_type) VALUES(?);';
        const queryParams = [paramsObj.charge_type];
        return queryPromise(queryString, queryParams);
    },
    updateChargeTypeById: (paramsObj) => {
        const queryString = 'UPDATE charge_types SET charge_type=?, active=? WHERE charge_type_id=?;';
        const queryParams = [paramsObj.charge_type, paramsObj.active, paramsObj.charge_type_id];
        return queryPromise(queryString, queryParams);
    },
    deleteChargeTypeById: (id) => {
        const queryString = 'DELETE FROM charge_types WHERE charge_type_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = ChargeType;
