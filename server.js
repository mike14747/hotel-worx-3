require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session');
const sessionStore = require('./config/sessionStore');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    key: 'hotel-worx-3',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return next();
        // res.status(401).end();
    }
}

const authController = require('./controllers/authController');
app.use('/api/auth', authController);

const controllers = require('./controllers');
// app.use('/api', controllers);
app.use('/api', isAuthenticated, controllers);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Express API Server now listening on PORT ${PORT}!`);
});
