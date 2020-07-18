const PaymentType = require('../../models/paymentType');
const { message, activeError, boolRegEx } = require('./generalValidation');

const isPaymentTypeValid = async (paramsObj) => {
    const errorArray = [];
    if (paramsObj.payment_type_id != null) {
        try {
            const [data, error] = await PaymentType.getPaymentTypeById({ id: paramsObj.payment_type_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('payment_type_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    if (typeof (paramsObj.payment_type) !== 'string' || paramsObj.payment_type.length < 1) errorArray.push('payment_type should be a string with non-zero length');
    if (!boolRegEx.test(paramsObj.active)) errorArray.push(activeError);
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isPaymentTypeValid,
};
