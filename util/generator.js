/**
 * Import UNG lib
 */

const ung = require('unique-names-generator');
const uuid = require('uuid-random');
const TokenGenerator = require('uuid-token-generator');


/**
 * Custom name config
 */

module.exports.UngConfig = {
    dictionaries: [ung.adjectives, ung.animals],
    separator: '-',
    style: 'upperCase'
};


/**
 * Geberates UUID key
 */

module.exports.generateUUID = uuid();


/**
 * generate acces token
 */

module.exports.generateToken = (encoding = TokenGenerator.BASE62) => {
    const tokgen2 = new TokenGenerator(256, encoding);
    return tokgen2.generate();
};