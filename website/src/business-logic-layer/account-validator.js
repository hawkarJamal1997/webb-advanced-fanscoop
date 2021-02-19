const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 15
const MIN_PASSWORD_LENGTH = 7
const MAX_PASSWORD_LENGTH = 30

exports.getErrorsNewAccount = function(account){
	
	const errors = []

	console.log(account.username, account.password, "valid");
	
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("usernameMissing")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("usernameTooShort")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("usernameTooLong")
	}

	// Validate password.
	if(!account.hasOwnProperty("password")){
		errors.push("passwordMissing")
	}else if(account.password.length < MIN_PASSWORD_LENGTH || MAX_PASSWORD_LENGTH < account.password.length){
		errors.push("passwordLengthError")
	}
	
	return errors
	
}