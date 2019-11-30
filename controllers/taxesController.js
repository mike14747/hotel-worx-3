const router = require('express').Router();
const Tax = require('../models/tax');

// all these routes point to /api/taxes as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/taxes route root!');
});

router.get('/all', async (req, res) => {
    try {
        const data = await Tax.getAllTaxRates();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.post('/', async (req, res) => {
    const paramsObj = {
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
        active: req.body.active,
    };
    try {
        const data = await Tax.addNewTax(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.put('/', async (req, res) => {
    const paramsObj = {
        tax_id: req.body.tax_id,
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
        active: req.body.active,
    };
    try {
        const data = await Tax.updateTaxById(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Tax.deleteTaxById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
