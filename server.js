require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3001;

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

const { dbTest } = require('./config/connectionPool');

app.use(require('./controllers/testController'));

dbTest()
    .then(() => {
        // app.use(require('./passport/expressSession'));
        // const passport = require('./passport/passportFunctions');
        // app.use(passport.initialize());
        // app.use(passport.session());
        // app.use('/api/auth', require('./controllers/authController'));
        app.use('/api', checkAuthenticated, require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).json({ Error: 'There is no connection to the database!' });
        });
    })
    .finally(() => {
        // if (process.env.NODE_ENV === 'production') {
        //     app.use(express.static(path.join(__dirname, 'client/build')));
        //     app.get('*', (req, res) => {
        //         res.sendFile(path.join(__dirname, 'client/build/index.html'));
        //     });
        // }

        // use this code if you only want the description of the api to appear on the deployed version at heroku
        if (process.env.NODE_ENV === 'production') {
            app.get('*', (req, res) => {
                // res.sendFile(path.join(__dirname, 'docs/index.html'));
                res.send('This is a test page!');
            });
        }
    });

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = app;
