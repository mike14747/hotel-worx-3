const Customer = require('../../models/customer');
const { message } = require('./generalValidation');

const isCustomerBodyValid = async (paramsObj) => {
    const errorArray = [];
    const { customer_id: customerId, ...stringParams } = paramsObj;
    if (customerId != null) {
        try {
            const [data, error] = await Customer.getCustomerById({ id: paramsObj.customer_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('customer_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    Object.keys(stringParams).forEach(key => {
        if (typeof (stringParams[key]) !== 'string' || stringParams[key].length < 1) errorArray.push(key + ' should be a string with non-zero length');
    });
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isCustomerBodyValid,
};
