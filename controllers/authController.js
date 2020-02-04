const router = require('express').Router();
const Auth = require('../models/auth');

const bcrypt = require('bcrypt');

// this is used by passport.authenticate on the /api/auth/login POST route
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    const paramsObj = {
        id: id,
    };
    Auth.getUserByIdForPassport(paramsObj, (err, returnedUserInfo) => {
        const user = { id: returnedUserInfo[0].user_id, username: returnedUserInfo[0].username, access_level: returnedUserInfo[0].access_level };
        done(err, user);
    });
});
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => {
    if (!req.user) {
        const paramsObj = {
            username: username,
        };
        Auth.getUserByUsernameForPassport(paramsObj, (err, returnedUserCredentials) => {
            if (err) return done(err);
            if (returnedUserCredentials.length === 0) return done(null, false);
            bcrypt.compare(password, returnedUserCredentials[0].password)
                .then((res) => {
                    if (!res) return done(null, false);
                    const validatedUser = returnedUserCredentials[0];
                    return done(null, validatedUser.user_id);
                })
                .catch((err) => {
                    return done(err);
                });
        });
    } else {
        return done(null, req.user);
    }
}));
// end 'used by passport.authenticate on the /api/auth/login POST route'

// all these routes point to api/auth as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/auth route root!');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

module.exports = router;
