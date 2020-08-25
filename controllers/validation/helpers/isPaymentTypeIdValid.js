const PaymentType = require('../../../models/paymentType');

const isPaymentTypeIdValid = async (id) => {
    const [data, error] = await PaymentType.getPaymentTypeById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('payment_type_id ' + id + ' does not exist!');
};

module.exports = isPaymentTypeIdValid;
