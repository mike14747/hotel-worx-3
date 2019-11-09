const router = require('express').Router();
const db = require('../models/index.js');
// or
// const Generic = require('../models/generic');

// all these routes point to /api/generic as specified in server.js and controllers/index.js

router.route('/').get((req, res) => {
    res.status(200).send('Sending this from the /api/generic route root!');
});

router.get('/some_sub_path', (req, res) => {
    db.Generic.getSomeData(req.params.some_param, (data) => {
        res.json(data);
    });
});

module.exports = router;
