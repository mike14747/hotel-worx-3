require('dotenv').config();
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const app = express();
const path = require('path');

const connectionPool = require('./config/connectionPool');

app.use(require('./passport/expressSession'));

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

connectionPool.mysqlConnect()
    .then(() => {
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', checkAuthenticated, require('./controllers'));
    })
    .catch((error) => {
        console.error('Failed to connect to the database!\n' + error);
        app.get('/api/*', (req, res) => {
            res.status(500).send('There is no connection to MySQL!');
        });
    })
    .finally(() => {
        if (NODE_ENV === 'production') {
            app.use(express.static('./client/build'));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/build/index.html'));
            });
        }
        app.get('*', (req, res) => {
            if (process.env.NODE_ENV === 'production') {
                res.sendFile(path.join(__dirname, '../client/build/index.html'));
            } else {
                res.sendFile(path.join(__dirname, 'index.html'));
            }
        });
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT);
        });
    });
