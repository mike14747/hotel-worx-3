require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/port', (req, res) => {
    res.send(`Express API Server now listening on PORT ${PORT}!`);
});

const controllers = require('./controllers');
app.use('/api', controllers);

app.listen(PORT, () => {
    console.log(`Express API Server now listening on PORT ${PORT}!`);
});
