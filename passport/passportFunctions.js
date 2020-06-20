const passport = require('passport');
const Auth = require('../models/auth');

const LoginStrategy = require('./loginStrategy');
passport.use('login', LoginStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [data, error] = await Auth.getUserByIdPassport({ id: id });
        if (!data) return done(error);
        if (data.length === 1) {
            const user = {
                id: data[0].user_id,
                username: data[0].username,
                access_level: data[0].access_level,
                access_type: data[0].access_type,
            };
            return done(null, user);
        }
        return done(null, false, { message: 'Could not find a valid user!' });
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;
