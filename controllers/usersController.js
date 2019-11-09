const router = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// all these routes point to /api/user as specified in server.js and controllers/index.js

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/users route root!');
});

router.get('/all', (req, res) => {
    User.getAllUsers((data) => {
        res.json(data);
    });
});

router.get('/:id', (req, res) => {
    User.getUserById(req.params.id, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.status(406).send('Username and/or Password don\'t meet length standards!');
    } else {
        User.checkExistingUsername(req.body.username, (data) => {
            if (data.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    const paramsObj = {
                        username: req.body.username,
                        password: hash,
                        access_id: req.body.access_id,
                        active: req.body.active,
                    };
                    User.addNewUser(paramsObj, (data) => {
                        if (data.insertId) {
                            res.status(201).send('New user was successfully added!');
                        } else {
                            res.status(500).send('Could not add the new user due to server error... please try again!');
                        }
                    });
                });
            } else {
                res.status(202).send('Username is already in use!');
            }
        });
    }
});

router.put('/:id', (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.status(406).send('Username and/or Password don\'t meet length standards!');
    } else {
        const paramsObj = {
            user_id: req.params.id,
            username: req.body.username,
        };
        User.checkUsernameForUpdate(paramsObj, (data) => {
            if (data.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    paramsObj.password = hash;
                    paramsObj.access_id = req.body.access_id;
                    paramsObj.active = req.body.active;
                    User.updateUserById(paramsObj, (data) => {
                        if (data.changedRows > 0) {
                            res.status(201).send('User info was successfully updated!');
                        } else {
                            res.status(400).send('Could not find user... please try again!');
                        }
                    });
                });
            } else {
                res.status(202).send('Username is already in use!');
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    User.deleteUserById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(201).send('User was successfully deleted!');
        } else {
            res.status(202).send('User could not be deleted!');
        }
    });
});

module.exports = router;
