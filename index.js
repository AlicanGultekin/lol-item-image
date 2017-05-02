'use strict';

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'item', alias: 'i', type: String },
    { name: 'serve', alias: 's', type: Boolean, defaultOption: true }
];
const options = commandLineArgs(optionDefinitions);

const config = require('./config');
const getItems = require('./items').getItems;
const getItemImageUrl = require('./item-image');

if (options.item) { //if script is run with -i "Boots of Speed" or --item "Boots of Speed", query that and print to console
    getItemImageUrl(options.item.toLowerCase())
        .then((url) => {
            console.log(url);
        })
        .catch((err) => {
            console.error(err);
        });
} else if (options.serve) { // start server
    let server = require('./server');
} else { //expose functionality as a module
    module.exports = {
        getItemImageUrl: getItemImageUrl,
        config: config
    }
}