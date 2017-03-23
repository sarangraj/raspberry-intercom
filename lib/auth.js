'use strict';
var crypto = require('crypto');
/**
 * hash password with sha1.
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
        var salt = 'sbffrkfdsm45mdfn4'; 
        var passwordData = sha1(userpassword, salt);
        return (passwordData.passwordHash);
    }
}