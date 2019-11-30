const queryPromise = require('../config/queryPromise');
const queryPromiseNoParams = require('../config/queryPromiseNoParams');

const PaymentType = {
    getPaymentTypeId: (id) => {
        const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt WHERE pt.paymeny_type_id=?;';
        const queryParams = [id];
        return queryPromise(queryString, queryParams);
    },
    getAllPaymentTypes: () => {
        const queryString = 'SELECT pt.payment_type_id, pt.payment_type, pt.active FROM payment_types AS pt;';
        return queryPromiseNoParams(queryString);
    },
    addNewPaymentType: (paramsObj) => {
        const queryString = 'INSERT INTO payment_types (payment_type) VALUES (?);';
        const queryParams = [paramsObj.payment_type];
        return queryPromise(queryString, queryParams);
    },
};

module.exports = PaymentType;
