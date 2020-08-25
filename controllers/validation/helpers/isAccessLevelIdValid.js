const AccessLevel = require('../../../models/accessLevel');

const isAccessLevelIdValid = async (id) => {
    const [data, error] = await AccessLevel.getAccessLevelById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('access_level_id ' + id + ' does not exist!');
};

module.exports = isAccessLevelIdValid;
