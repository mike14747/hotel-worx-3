const router = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// all these routes point to /api/users as specified in server.js and controllers/index.js

router.get('/', async (req, res, next) => {
    try {
        const data = await User.getAllUsers();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await User.getUserById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.status(406).send('Username and/or Password don\'t meet length standards!');
    } else {
        try {
            const existingUser = await User.checkExistingUsername({ username: req.body.username });
            if (existingUser.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                    if (err) throw err;
                    const paramsObj = {
                        username: req.body.username,
                        password: hash,
                        access_id: req.body.access_id,
                        active: req.body.active,
                    };
                    const data = await User.addNewUser(paramsObj);
                    res.json(data);
                });
            } else {
                res.status(202).send('Username is already in use!');
            }
        } catch (error) {
            next(error);
        }
    }
});

router.put('/', async (req, res, next) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.status(406).send('Username and/or Password don\'t meet length standards!');
    } else {
        const paramsObj = {
            user_id: req.body.user_id,
            username: req.body.username,
        };
        try {
            const confirmUser = await User.checkUsernameForUpdate(paramsObj);
            if (confirmUser.length === 0) {
                bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                    if (err) throw err;
                    paramsObj.password = hash;
                    paramsObj.access_id = req.body.access_id;
                    paramsObj.active = req.body.active;
                    const data = await User.updateUserById(paramsObj);
                    res.json(data);
                });
            } else {
                res.status(202).send('Username is already in use!');
            }
        } catch (error) {
            next(error);
        }
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await User.deleteUserById({ id: Number(req.params.id) });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
