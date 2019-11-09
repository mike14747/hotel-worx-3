const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

const authController = require('./authController');
router.use('/auth', authController);

const usersController = require('./usersController');
router.use('/users', usersController);

const customersController = require('./customersController');
router.use('/customers', customersController);

module.exports = router;
