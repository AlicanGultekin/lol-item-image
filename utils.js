/**
 * Utils
 * @module utils
 */
'use strict';

/**
 * Throws error if a mandatory parameter is not passed.
 * Assign this as a default to a parameter to make that parameter mandatory.
 *
 * @param {string} parameterName Mandatory parameter name
 */
const requireParam = parameterName => { throw new Error(`Missing parameter: ${parameterName}`); }

/**
 * Converts JSON to lower case.
 *
 * @param {Object} json
 * @returns {Object}
 */
const convertJsonToLowerCase = json => {
    return JSON.parse(JSON.stringify(json, (key, value) => {
        return typeof value === "string" ? value.toLowerCase() : value
    }));
}

/**
 * Removes the trailing slash from a string if it has one.
 *
 * @param {string} url
 * @returns {string} url
 */
const removeTrailingSlash = url => {
    if (url.match(/\/$/)) { url = url.slice(0, -1); }
    return url;
}

module.exports = {
    requireParam: requireParam,
    convertJsonToLowerCase: convertJsonToLowerCase,
    removeTrailingSlash: removeTrailingSlash
};