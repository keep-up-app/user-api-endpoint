/**
 * Validator function to determing which inputted field is invalid.
 * Returns first invalid key
 * 
 * @param  {Object} fields 
 */

module.exports.make = fields => {
    return new Promise((resolve, reject) => {

        for (var key in fields) {
    
            var field = fields[key];
            var error = null;

            if (!field) return reject({ message: `Missing ${key}.`, code: 400 });
    
            if (key == 'password')
                error = validatePassword(field);
            else if (key == 'email')
                error = validateEmail(field);
            else if (key == '_id')
                error = validateUuid(field);
            else if (key == 'steamid')
                error = validateSteamId(field);
    
            if (error) return reject({ message: error, code: 400 });
        }
    
        return resolve(null);
    });
}


/**
 * Validates UUID key
 * @param {String} id 
 */

function validateUuid(uuid) {
    let regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
    if (!uuid.match(regex))
        return 'Invalid UUID.';
    return null;
}


/**
 * Validate Steam Id
 * @param {String} id 
 */

function validateSteamId(id) {
    if (!id.match(/^[0-9]{17}$/))
        return "Invalid Steam ID.";
    return null;
}


/**
 * Validates Mongoose Id
 * @param {String} id 
 */

function validateMongooseId(id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
        return 'Invalid Mongoose ID.';
    return null;
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
        if (isInt(char)) containsInt = true;
        else containsChar = true;
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
    if (isNaN(value)) return false;
    var x = parseFloat(value);
    return (x | 0) === x;
}