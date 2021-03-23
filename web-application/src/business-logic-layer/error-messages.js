const LIMIT = require('./commons')

module.exports = {

    errorTranslations : {
        notAuthorized: "Only admin is allowed to create clubs.",
        notLoggedIn: "You must be logged in to create a blog post.",
        accountMissing: "Account does not exist, please try again!",
        usernameMissing: "Username is missing, please fill out the password field!",
        usernameTooShort: "The username must be longer than "+LIMIT.MIN_USERNAME_LENGTH+" characters.",
        usernameTooLong: "The username must be shorter than "+LIMIT.MAX_USERNAME_LENGTH+" characters.",
        usernameTaken: "Username is already taken.",
        passwordMissing: "Password is missing, please fill out the password field!",
        passwordLengthError: "The password must be between "+LIMIT.MIN_PASSWORD_LENGTH+" and "+LIMIT.MAX_PASSWORD_LENGTH+" characters.",
        usernameInvalidCharacters: "Username can't have special characters!",
        passwordIncorrect: "Password is wrong, try again!",
        notRightUser: "You are not the user of this post!",
        clubNameTooShort: "The name of the Club must be longer than "+LIMIT.MIN_CLUBNAME_LENGTH+" characters.",
        clubNameTooLong: "The name of the Club must be shorter than "+LIMIT.MAX_CLUBNAME_LENGTH+" characters.",
        clubExists: "A club with this name has already been made.",
        titleMissing: "Title is missing, please fill out the title field.",
        titleTooShort: "The title must be longer than "+LIMIT.MIN_TITLE_LENGTH+" characters.",
        titleTooLong: "The title must be shorter than "+LIMIT.MAX_TITLE_LENGTH+" characters.",
        titleTaken: "A post with this title has already been made.",
        contentMissing: "Content missing, please fill out content field.",
        contentTooShort: "The content must be longer than "+LIMIT.MIN_CONTENT_LENGTH+" characters.",
        contentTooLong: "The content must be shorter than "+LIMIT.MAX_CONTENT_LENGTH+" characters.",
        internalError: "Can't carry out the request now."
    }
    
}