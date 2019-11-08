const router = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

// this is used by passport.authenticate on the /api/auth/login POST route
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    User.getUserByIdForPassport(id, (err, returnedUserInfo) => {
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
        User.getUserByUsernameForPassport(username, (err, returnedUserCredentials) => {
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

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /auth route root!');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.post('/addUser', (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.redirect('/addUser');
    } else {
        const saltRounds = 10;
        User.checkExistingUsername(req.body.username, (data) => {
            if (data.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    const paramsObj = {
                        username: req.body.username,
                        password: hash,
                        access_level: req.body.access_level,
                    };
                    User.addNewUser(paramsObj, (result) => {
                        if (result.insertId) {
                            // redirect somewhere other than login, but I don't know where just yet
                            res.redirect('/login');
                        } else {
                            // the new user wasn't added to the database
                            res.redirect('/addUser');
                        }
                    });
                });
            } else {
                // that username is already taken
                res.redirect('/addUser');
            }
        });
    }
});

module.exports = router;
