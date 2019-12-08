const router = require('express').Router();
const Generic = require('../models/generic');

router.get('/', async (req, res) => {
    try {
        const data = await Generic.getAllTestGenerics();
        res.json(data);
    } catch (err) {
        console.log(err);
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Generic.getTestGenericById(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
