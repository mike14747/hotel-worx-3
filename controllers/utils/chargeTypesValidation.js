const ChargeType = require('../../models/chargeType');
const { message, activeError, activeRegEx } = require('./generalValidation');

const isChargeTypeValid = async (paramsObj) => {
    const errorArray = [];
    if (paramsObj.charge_type_id != null) {
        try {
            const [data, error] = await ChargeType.getChargeTypeById({ id: paramsObj.charge_type_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('charge_type_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    if (typeof (paramsObj.charge_type) !== 'string' || paramsObj.charge_type.length < 1) errorArray.push('charge_type should be a string with non-zero length');
    if (!activeRegEx.test(paramsObj.active)) errorArray.push(activeError);
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isChargeTypeValid,
};
