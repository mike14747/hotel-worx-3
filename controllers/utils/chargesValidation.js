const Charge = require('../../models/charge');
const ChargeType = require('../../models/chargeType');
const ResRoom = require('../../models/resRoom');
const { message, taxableError, boolRegEx } = require('./generalValidation');

const isChargeBodyValid = async (paramsObj) => {
    const errorArray = [];
    if (paramsObj.charge_id != null) {
        try {
            const [data, error] = await Charge.getChargeById({ id: paramsObj.charge_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('charge_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    try {
        const [chargeTypeResult, chargeTypeError] = await ChargeType.getActiveChargeTypeById({ id: paramsObj.charge_type_id });
        if (chargeTypeError) errorArray.push(chargeTypeError);
        if (chargeTypeResult && chargeTypeResult.length !== 1) errorArray.push('charge_type_id does not exist');
        const [resRoomResult, resRoomError] = await ResRoom.getActiveResRoomById({ id: paramsObj.res_room_id });
        if (resRoomError) errorArray.push(resRoomError);
        if (resRoomResult && resRoomResult.length !== 1) errorArray.push('res_room_id does not exist');
    } catch (error) {
        if (error) errorArray.push(error);
    }
    if (isNaN(parseFloat(paramsObj.charge_amount))) errorArray.push('charge_amount is not in a valid dollar amount');
    if (!boolRegEx.test(paramsObj.taxable)) errorArray.push(taxableError);
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isChargeBodyValid,
};
