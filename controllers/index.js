const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

const authController = require('./authController');
router.use('/auth', authController);

const usersController = require('./usersController');
router.use('/users', usersController);

const hwController = require('./hwController');
router.use('/', hwController);

module.exports = router;
