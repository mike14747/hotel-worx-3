const Strategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
// const salt = bcryptjs.genSaltSync(10);
const Auth = require('../models/auth');

const LoginStrategy = new Strategy(async (username, password, done) => {
    // console.log(bcryptjs.hashSync(password, salt));
    try {
        const [data, error] = await Auth.getUserByUsernamePassport({ username: username });
        if (!data) return done(error);
        if (data.length === 1) {
            bcryptjs.compare(password, data[0].password)
                .then((res) => {
                    if (res) return done(null, { id: data[0].user_id });
                    return done(null, false, { message: 'Incorrect password!' });
                })
                .catch(error => done(error));
        } else {
            return done(null, false, { message: 'Incorrect username!' });
        }
    } catch (error) {
        return done(error);
    }
});

module.exports = LoginStrategy;
