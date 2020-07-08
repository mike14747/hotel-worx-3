const Charge = require('../../models/charge');
const ChargeType = require('../../models/chargeType');
const ResRoom = require('../../resRoom');

const chargeTypeExists = async (id) => {
    try {
        if (!/^[0-9]+$/.test(id)) return false;
        const [data, error] = await ChargeType.getActiveChargeTypeById({ id });
        if (error) console.log(error);
        if (data && data.length === 1) return true;
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const resRoomExists = async (id) => {
    try {
        if (!/^[0-9]+$/.test(id)) return false;
        const [data, error] = await ResRoom.getActiveResRoomById({ id });
        if (error) console.log(error);
        if (data && data.length === 1) return true;
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const chargeExists = async (id) => {
    try {
        if (!/^[0-9]+$/.test(id)) return false;
        const [data, error] = await Charge.getChargeById({ id });
        if (error) console.log(error);
        if (data && data.length === 1) return true;
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    chargeTypeExists,
    resRoomExists,
    chargeExists,
};
