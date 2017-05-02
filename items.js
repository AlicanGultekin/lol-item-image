/**
 * Items
 * @module items
 */
'use strict';

const Promise = require('bluebird');
const NodeCache = require("node-cache");

const myCache = new NodeCache();
const requestPromise = require('request-promise');

const config = require('./config');
const utils = require('./utils');
const requireParam = utils.requireParam;
const convertJsonToLowerCase = utils.convertJsonToLowerCase;

const cacheCollectionName = config.cacheCollectionName || 'items';
const riotApiKey = config.riotApiKey;

/**
 * Caches items returned by the remote source.
 * @function cacheItems
 *
 * @param {Object} items Items object to be cached
 * @returns {Promise} Cached items object
 */
const cacheItems = Promise.method((items) => {
    let cachedItems = myCache.set(cacheCollectionName, items);
    if (cachedItems) {
        return items;
    } else {
        throw new Error('Could not cache items!');
    }
})

/**
 * Requests items from the remote source.
 * @function requestItems
 *
 * @param {string} riotApiKey Riot Games API key
 * @param {string} [region='na1'] Region
 * @returns {Promise} Items object
 */
const requestItems = Promise.method((
    riotApiKey = requireParam('riotApiKey'),
    region = 'na1') => {
    var requestOptions = {
        uri: config.alternateItemsUrl || `https://${region}.api.riotgames.com/lol/static-data/v3/items?itemListData=image&api_key=${riotApiKey}`,
        json: true
    };

    if (config.proxy) { requestOptions.proxy = config.proxy; }

    return requestPromise(requestOptions).then((result) => {
        return convertJsonToLowerCase(result.data);
    })
})

/**
 * Populates item data.
 * @function populateItems
 *
 * @param {string} riotApiKey Riot Games API key
 * @param {string} [region='na1'] Region
 * @returns {Promise} Populated items object
 */
const populateItems = Promise.method((
    riotApiKey = requireParam('riotApiKey'),
    region = 'na1'
) => {
    return requestItems(riotApiKey, region).then((items) => {
        return cacheItems(items);
    })
})

/**
 * Retrieves items from remote source or cache if available.
 * @function getItems
 *
 * @param {string} riotApiKey Riot Games API key
 * @param {string} [region='na1'] Region
 * @returns {Promise} League of Legends items object
 */
const getItems = Promise.method((
    riotApiKey = (config.riotApiKey || requireParam('riotApiKey')),
    region = 'na1'
) => {
    let items = myCache.get(cacheCollectionName);
    return items || populateItems(riotApiKey, region);
})

module.exports = {
    getItems: getItems
};