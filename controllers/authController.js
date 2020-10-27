const router = require('express').Router();
const passport = require('../passport/passportFunctions');

router.get('/logout', (req, res) => {
    req.logOut();
    req.isAuthenticated() ? res.status(500).json({ message: 'Logout was unsuccessful', user: req.user }) : res.status(200).json({ message: 'User has been logged out', user: null });
});

router.get('/status', (req, res) => {
    req.isAuthenticated() ? res.json({ user: req.user }) : res.json({ user: null });
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

module.exports = router;
