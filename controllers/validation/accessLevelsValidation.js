const AccessLevel = require('../../models/accessLevel');
const { message } = require('./generalValidation');

const isAccessLevelBodyValid = async (paramsObj) => {
    const errorArray = [];
    if (paramsObj.access_id != null) {
        try {
            const [data, error] = await AccessLevel.getAccessLevelById({ id: paramsObj.access_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('access_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    if (!/^[0-9]+$/.test(paramsObj.access_level)) errorArray.push('access_level needs to be an integer');
    if (typeof (paramsObj.access_type) !== 'string' || paramsObj.access_type.length < 1) errorArray.push('access_type should be a string with non-zero length');
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isAccessLevelBodyValid,
};
