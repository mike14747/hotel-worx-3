const router = require('express').Router();
const Joi = require('joi');

// all these routes point to the base route path of /api as specified in server.js

// remove this once the app goes into production with the frontend and backend on the same server
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.use('/users', require('./usersController'));

router.use('/customers', require('./customersController'));

router.use('/rooms', require('./roomsController'));

router.use('/room-types', require('./roomTypesController'));

router.use('/reservations', require('./reservationsController'));

router.use('/taxes', require('./taxesController'));

router.use('/invoices', require('./invoicesController'));

router.use('/charges', require('./chargesController'));

router.use('/charge-types', require('./chargeTypesController'));

router.use('/companies', require('./companiesController'));

router.use('/payment-types', require('./paymentTypesController'));

router.use('/access-levels', require('./accessLevelsController'));

router.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    if (error instanceof Joi.ValidationError) {
        return res.status(400).json({ 'Validation error': error.details[0].message });
    } else if (error instanceof RangeError) {
        return res.status(400).json({ 'Invalid request': error.message });
    }
    res.status(error.status || 500);
    error.status === 404 ? res.send(error.message) : res.send('Request failed... please check your request and try again!\n' + error.message);
});

module.exports = router;
