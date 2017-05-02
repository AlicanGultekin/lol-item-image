/**
 * Item Image
 * @module item image
 */
'use strict';

const Promise = require('bluebird');
const jsonPath = require('jsonpath');

const config = require('./config');
const getItems = require('./items').getItems;
const utils = require('./utils');
const requireParam = utils.requireParam;
const removeTrailingSlash = utils.removeTrailingSlash;

const dataDragonUrl = removeTrailingSlash(config.dataDragonUrl) || 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item';

/**
 * Retrieves item image URL.
 * @function getItemImageUrl
 *
 * @param {string} itemName Name of an item in League of Legends
 * @param {string} riotApiKey Riot Games API key
 * @returns {Promise} Item image URL
 */
const getItemImageUrl = Promise.method((
    itemName = requireParam('itemName'),
    riotApiKey = (config.riotApiKey || requireParam('riotApiKey'))
) => {
    return getItems(riotApiKey)
        .then((items) => {
            if (items) {
                //Find the item we are looking for and parse its image name.
                //[0] because JSONPath returns array but since we know LoL items are uniquely named, there'll be only 1 result.
                //${itemName} below is staticly evaluated with no side effects.
                //See JSONPath reference: http://goessner.net/articles/JsonPath/index.html#e2
                let itemImageName = jsonPath.query(items, `$..[?(@.name=="${itemName}")].image.full`)[0];

                if (itemImageName && itemImageName.length > 0) {
                    let itemImageUrl = `${dataDragonUrl}/${itemImageName}`;
                    return itemImageUrl;
                } else {
                    throw new Error(`Cannot get item image url for ${itemName}`)
                }
            } else {
                throw new Error('Invalid items object!');
            }
        })
        .catch((err) => {
            throw new Error(err);
        })
})

module.exports = getItemImageUrl;