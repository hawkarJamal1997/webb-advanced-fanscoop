const accountValidator = require('./account-validator')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function({accountRepository}){

	const exports = {}

	exports.getAllAccounts = function(callback){
		accountRepository.getAllAccounts(callback)
	}
	
	exports.createAccount = function(account, callback){
		
		// Validate the account.
		console.log("manager" + account.username);
		const errors = accountValidator.getErrorsNewAccount(account)
		
		if(0 < errors.length){
			callback(errors, null)
			return
		}
		bcrypt.hash(account.password, saltRounds, function(error, hash){
			if(error){
				callback("internalError", null)
				return
			}else{
				account.password = hash
				accountRepository.createAccount(account, callback)
			}
		})
	}

	exports.signInAccount = function(accountCheck, callback){
		
		const errors = []

		accountRepository.signInAccount(accountCheck, function(error, account){
			//if no accounts exists by the name of accountCheck.username
	
			if(!account){
                errors.push("accountMissing")
			}else if(error){
				errors.push("internalError")
			}

			if(errors.length > 0){
				callback(errors, null)
				return
			}else{
				bcrypt.compare(accountCheck.password, account.hashedPassword, function(error, result){
					if(error){
						errors.push("internalError")
					}else if(!result){
						errors.push("passwordIncorrect")
					}
					//sends back account if password is correct
					callback(errors, account)
				})
			}
		})
	}
	
	exports.getAccountByUsername = function(username, callback){
		accountRepository.getAccountByUsername(username, callback)
	}

	return exports

}

