/**
 * Import UNG lib
 */

const ung = require('unique-names-generator');
const uuid = require('uuid-random');


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

module.exports.generateToken = (length = 30) => {
    var result           = '';
    var characters       = 'abcdef0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ )
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
 };