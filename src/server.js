require('dotenv').config();
const { init, lookupSimple } = require('./suggestions');

// create smarty client
init();

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/suggestions', async (req, res, next) => {
    const { input } = req.query;
    const results = await lookupSimple(input);
    res.json(results);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.on('error', error => {
    console.log(error.message);
});

