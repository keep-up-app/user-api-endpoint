/**
 * Loading require dependencies
 */

const bcrypt = require('bcrypt'); 
const saltRounds = 10;

module.exports = {
    hashPassword,
    checkPassword
}


/**
 * Hashs password from plain text
 * 
 * @param {String} unhashedPassword 
 */

function hashPassword(unhashedPassword) {
    return bcrypt.hashSync(unhashedPassword, saltRounds);
}


/**
 * Checks whether plain password matches the hashed password
 *  
 * @param {String} plainPassword 
 * @param {String} hashedPassword 
 */

function checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}