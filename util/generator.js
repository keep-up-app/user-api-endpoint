/**
 * Import UNG lib
 */

const ung = require('unique-names-generator');


/**
 * Custom name config
 */

const config = {
    dictionaries: [ung.adjectives, ung.colors, ung.animals],
    separator: '-',
    style: 'upperCase'
};


/**
 * Use as username generator
 */

module.exports.generateUsername = ung.uniqueNamesGenerator(config);