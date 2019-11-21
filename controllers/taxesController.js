const router = require('express').Router();
const Tax = require('../models/tax');

// all these routes point to /api/taxes as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/taxes route root!');
});

router.get('/all', (req, res) => {
    Tax.getAllTaxRates((data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const paramsObj = {
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
        active: req.body.active,
    };
    Tax.addNewTax(paramsObj, (data) => {
        console.log(data);
        if (data.insertId) {
            res.status(200).send('Tax was successfully added!');
        } else {
            res.status(400).send('Could not add tax... please check your request and try again!');
        }
    });
});

router.put('/', (req, res) => {
    const paramsObj = {
        tax_id: req.body.tax_id,
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
        active: req.body.active,
    };
    Tax.updateTaxById(paramsObj, (data) => {
        if (data.changedRows > 0) {
            res.status(200).send('Tax was successfully updated!');
        } else {
            res.status(400).send('Could not update tax... please check your request and try again!');
        }
    });
});

router.delete('/:id', (req, res) => {
    Tax.deleteTaxById(req.params.id, (data) => {
        if (data.affectedRows === 1) {
            res.status(200).send('Tax was successfully deleted!');
        } else {
            res.status(400).send('Could not delete tax... please check your request and try again!');
        }
    });
});

module.exports = router;
