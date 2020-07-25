const router = require('express').Router();
const passport = require('../passport/passportFunctions');

router.get('/logout', (req, res) => {
    req.logOut();
    if (req.isAuthenticated()) {
        res.status(500).json({ message: 'Logout was unsuccessful', user: req.user });
    } else {
        res.status(200).json({ message: 'User has been logged out', user: null });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(299).json(info);
        req.logIn(user, function (error) {
            if (error) return next(error);
        });
        return res.status(200).json({ user: user, message: 'successful login' });
    })(req, res, next);
});

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(299).json({ error: 'User is not logged in!' });
    }
});

module.exports = router;
