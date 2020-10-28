/**
 * Validator function to determing which inputted field is invalid.
 * Returns first invalid key
 * 
 * @param  {Object} fields 
 */

module.exports.make = fields => {
    var error = null;

    for (var key in fields) {

        var field = fields[key];

        if (field === undefined || field == "")
            return `Missing ${key}.`;

        if (key == 'password')
            error = validatePassword(field);
        else if (key == 'email')
            error = validateEmail(field);

        if (error) return error;
    }

    return error;
}


/**
 * Validates email
 * 
 * @param {String} email 
 */

function validateEmail(email) {
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(email))
        return 'Invalid Email.';
    return null;
}


/**
 * Validates Password
 * 
 * @param {String} password 
 */

function validatePassword(password) {
    if (password.length < 5)
        return 'Password too short.';

    var containsInt = false;
    var containsChar = false;

    for (var i = 0; i < password.length; i++) {
        var char = password[i];
        if (isInt(char)) {
            containsInt = true;
        } else {
            containsChar = true;
        }
    }

    if (!containsInt || !containsChar)
        return 'Password must be alphanumerical.';

    return null;
}


/**
 * Check if char is numeric
 * @param {Char} value 
 */

function isInt(value) {
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}