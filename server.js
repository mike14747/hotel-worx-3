require('dotenv').config();
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const path = require('path');

const { mysqlConnect } = require('./config/connectionPool');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // return res.status(401).json({ message: 'User must be logged in to access these routes!' });
        return next();
    }
}

mysqlConnect()
    .then(() => {
        app.use(require('./passport/expressSession'));
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.get('/api/test', (req, res) => res.status(200).end());
        app.use('/api/auth', require('./controllers/authController'));
        app.use('/api', checkAuthenticated, require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'There is no connection to the database!' });
        });
    })
    .finally(() => {
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        }
    });

const server = app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = server;
