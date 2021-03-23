const bcrypt = require('bcrypt')
const LIMIT = require('./commons')

exports.getErrorsNewAccount = function(account){
	
	const errors = []
	
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("usernameMissing")
	}else if(account.username.length < LIMIT.MIN_USERNAME_LENGTH){
		errors.push("usernameTooShort")
	}else if(LIMIT.MAX_USERNAME_LENGTH < account.username.length){
		errors.push("usernameTooLong")
	}else if((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(account.username)){
		errors.push("usernameInvalidCharacters")
	}

	// Validate password.
	if(!account.hasOwnProperty("password")){
		errors.push("passwordMissing")
	}else if(account.password.length < LIMIT.MIN_PASSWORD_LENGTH || LIMIT.MAX_PASSWORD_LENGTH < account.password.length){
		errors.push("passwordLengthError")
	}

	return errors
	
}
