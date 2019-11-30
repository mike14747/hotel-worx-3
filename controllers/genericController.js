// const router = require('express').Router();
// const Generic = require('../models/generic');

// router.get('/', (req, res) => {
//     res.status(200).send('Sending this from the /api/generic route root!');
// });

// router.get('/some_sub_path', (req, res) => {
//     Generic.getSomeData(req.params.some_param, (data) => {
//         res.json(data);
//     });
// });

// module.exports = router;

// temporary testing genericController

const router = require('express').Router();
const Generic = require('../models/generic');

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api/generic route root!');
});

router.get('/all', async (req, res) => {
    try {
        const data = await Generic.getAllTestGenerics();
        res.json(data);
    } catch (err) {
        console.log(err);
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const data = await Generic.getTestGenericById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
