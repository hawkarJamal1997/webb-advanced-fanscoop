const bcrypt = require('bcrypt')
const LIMIT = require('./commons')

exports.getErrorsNewAccount = function(account) {

    const errors = []

    // Validate username.
    if (!(/\w+/).test(account.username)) {
        errors.push("usernameMissing")
        return errors
    } else if ((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(account.username)) { //regex that does not allow special characters 
        errors.push("usernameInvalidCharacters")
        return errors
    } else if (account.username.length < LIMIT.MIN_USERNAME_LENGTH) {
        errors.push("usernameTooShort")
    } else if (LIMIT.MAX_USERNAME_LENGTH < account.username.length) {
        errors.push("usernameTooLong")
    }

    // Validate password.
    if (!(/\w+/).test(account.password)) {
        errors.push("passwordMissing")
    } else if (account.password.length < LIMIT.MIN_PASSWORD_LENGTH || LIMIT.MAX_PASSWORD_LENGTH < account.password.length) {
        errors.push("passwordLengthError")
    }

    return errors

}