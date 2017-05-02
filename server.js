'use strict';

const express = require('express');
const app = express();

const config = require('./config');
const port = config.port || 1337;
const getItems = require('./items').getItems;
const getItemImageUrl = require('./item-image');

app.get('/item/:name', (req, res) => {
    if (req.params.name) {
        getItemImageUrl(req.params.name.toLowerCase())
            .then((url) => {
                console.log(`${req.params.name}: ${url}`);
                res.status(200).send(url);
            })
            .catch((err) => {
                console.error(err);
                res.status(400).send(err.message);
            });
    } //no need for else, if the name param is missing, it'll be handled automatically.
})

module.exports = app.listen(port, () => {
    console.log(`Listening at port ${port}

                      /item/:itemName`);
});