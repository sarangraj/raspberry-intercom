'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha1 = function(password, salt){
    var hash = crypto.createHmac('sha1', salt); /** Hashing algorithm sha1 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
module.exports ={
    saltHashPassword: function(userpassword) {
        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = sha1(userpassword, salt);
        return (passwordData.passwordHash);
    }
}