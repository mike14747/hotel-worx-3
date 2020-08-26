const ChargeType = require('../../../models/chargeType');

const isChargeTypeIdValid = async (id) => {
    const [data, error] = await ChargeType.getChargeTypeById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('charge_type_id ' + id + ' does not exist!');
};

module.exports = isChargeTypeIdValid;
