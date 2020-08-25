const Tax = require('../../../models/tax');

const isTaxIdValid = async (id) => {
    const [data, error] = await Tax.getTaxById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('tax_id does not exist!');
};

module.exports = isTaxIdValid;
