const User = require('../../../models/user');

const isUserIdValid = async (id) => {
    const [data, error] = await User.getUserById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('user_id ' + id + ' does not exist!');
};

module.exports = isUserIdValid;
