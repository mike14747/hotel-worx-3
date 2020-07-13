require('dotenv').config();
const { NODE_ENV } = process.env;
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
        // return res.status(401).json({ message: 'User needs admin priviledges!' });
        return next();
    }
}

mysqlConnect()
    .then(() => {
        app.use(require('./passport/expressSession'));
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', checkAuthenticated, require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'There is no connection to the database!' });
        });
    });

if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}
app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = app;
