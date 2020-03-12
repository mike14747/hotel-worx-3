const router = require('express').Router();

// all these routes point to the base route path of /api as specified in server.js

// remove this once the app goes into production with the frontend and backend on the same server
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

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

const companiesController = require('./companiesController');
router.use('/companies', companiesController);

const paymentTypesController = require('./paymentTypesController');
router.use('/payment-types', paymentTypesController);

router.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500);
    error.status === 404 ? res.send(error.message) : res.send('Request failed... please check your request and try again!\n' + error.message);
});

module.exports = router;
