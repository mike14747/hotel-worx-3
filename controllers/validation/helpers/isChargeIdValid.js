const Charge = require('../../../models/charge');

const isChargeIdValid = async (id) => {
    const [data, error] = await Charge.getChargeById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('charge_id ' + id + ' does not exist!');
};

module.exports = isChargeIdValid;
