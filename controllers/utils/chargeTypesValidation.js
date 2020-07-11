const ChargeType = require('../../models/chargeType');

const chargeTypeExists = async (id) => {
    try {
        if (!/^[0-9]+$/.test(id)) return [null, 'charge_type_id was not in the proper format... needs to be an integer'];
        const [data, error] = await ChargeType.getActiveChargeTypeById({ id });
        if (error) return [null, error];
        if (data && data.length === 1) return [data, null];
        return [null, 'charge_type_id does not exist or is not active'];
    } catch (error) {
        return [null, error];
    }
};

module.exports = {
    chargeTypeExists,
};
