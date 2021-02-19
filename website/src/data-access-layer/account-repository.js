const db = require('./db')

module.exports = function(){

	/*
	Retrieves all accounts ordered by username.
	Possible errors: internalError
	Success value: The fetched accounts in an array.
	*/
	exports.getAllAccounts = function(callback){
		
		const query = `SELECT * FROM accounts ORDER BY username`
		const values = []
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], accounts)
			}
		})
		
	}

	/*
		Retrieves the account with the given username.
		Possible errors: internalError
		Success value: The fetched account, or null if no account has that username.
	*/
	exports.getAccountByUsername = function(username, callback){
		
		const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
		const values = [username]
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], accounts[0])
			}
		})
		
	}

	/*
		Creates a new account.
		account: {username: "The username", password: "The password"}
		Possible errors: internalError, usernameTaken
		Success value: The id of the new account.
	*/
	exports.createAccount = function(account, callback){
		
		const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
		const values = [account.username, account.password]
		
		db.query(query, values, function(error, results){
			if(error){
				if(error.sqlMessage.includes("usernameUnique")){
					callback(['usernameTaken'], null)
				}else{
					callback(['internalError'], null)
				}
			}else{
				callback([], results.insertId)
			}
		})
		
	}

	return exports

}
