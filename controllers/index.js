const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

const usersController = require('./usersController');
router.use('/users', usersController);

const customersController = require('./customersController');
router.use('/customers', customersController);

const roomsController = require('./roomsController');
router.use('/rooms', roomsController);

const roomTypesController = require('./roomTypesController');
router.use('/room-types', roomTypesController);

const reservationsController = require('./reservationsController');
router.use('/reservations', reservationsController);

const taxesController = require('./taxesController');
router.use('/taxes', taxesController);

const invoicesController = require('./invoicesController');
router.use('/invoices', invoicesController);

const chargesController = require('./chargesController');
router.use('/charges', chargesController);

const chargeTypesController = require('./chargeTypesController');
router.use('/charge-types', chargeTypesController);

module.exports = router;
