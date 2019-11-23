const router = require('express').Router();
const Generic = require('../models/generic');
// or
// const db = require('../models/index.js');

// all these routes point to /api/generic as specified in server.js and controllers/index.js

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/generic route root!');
});

router.get('/some_sub_path', (req, res) => {
    Generic.getSomeData(req.params.some_param, (data) => {
        res.json(data);
    });
});

module.exports = router;
