const Customer = require('../../../models/customer');

const isCustomerIdValid = async (id) => {
    const [data, error] = await Customer.getCustomerById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('customer_id does not exist!');
};

module.exports = isCustomerIdValid;
