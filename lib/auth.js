'use strict';
var crypto = require('crypto');
/**
 * hash password with sha1.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha1 = function(password){
    var hash = crypto.createHash('sha1'); /** Hashing algorithm sha1 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        passwordHash:value
    };
};
module.exports ={
    saltHashPassword: function(userpassword) {
        //var salt = ''; 
        var passwordData = sha1(userpassword);
        return (passwordData.passwordHash);
    }
}