const User = require('../../models/user');
const AccessLevel = require('../../models/accessLevel');
const { message, activeError, boolRegEx } = require('./generalValidation');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let hashedPassword = '';

const isUserBodyValid = async (paramsObj) => {
    const errorArray = [];
    if (typeof (paramsObj.username) !== 'string' || typeof (paramsObj.password) !== 'string' || (!paramsObj.username && paramsObj.username.length < 6) || (paramsObj.password && paramsObj.password.length < 6)) {
        errorArray.push('username and/or password must be strings and must meet the minimum length standards!');
        return [false, { message, errorArray }];
    }
    try {
        if (paramsObj.user_id != null) {
            const [userResult, userError] = await User.getUserById({ id: paramsObj.user_id });
            if (userError) errorArray.push(userError);
            if (userResult && userResult.length !== 1) {
                errorArray.push('user_id does not exist');
                return [false, { message, errorArray }];
            }
        }
        const [doesUsernameExist, usernameError] = await User.checkExistingUsername({ username: paramsObj.username, user_id: paramsObj.user_id || 0 });
        if (usernameError) errorArray.push(usernameError);
        if (doesUsernameExist) {
            if (doesUsernameExist.length === 0) {
                hashedPassword = bcrypt.hashSync(paramsObj.password, salt);
            } else {
                errorArray.push('username is already in use!');
            }
        }
        const [accessIdResult, accessLevelError] = await AccessLevel.getAccessLevelById({ id: paramsObj.access_id });
        if (accessLevelError) errorArray.push(accessLevelError);
        if (accessIdResult && accessIdResult.length !== 1) errorArray.push('access_id does not exist');
    } catch (error) {
        if (error) errorArray.push(error);
    }
    if (!boolRegEx.test(paramsObj.active)) errorArray.push(activeError);
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [hashedPassword, null];
};

module.exports = {
    isUserBodyValid,
};
