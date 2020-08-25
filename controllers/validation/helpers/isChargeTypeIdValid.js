const ChargeType = require('../../../models/chargeType');

const isChargeTypeIdValid = async (id) => {
    const [data, error] = await ChargeType.getChargeById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('charge_type_id does not exist!');
};

module.exports = isChargeTypeIdValid;
