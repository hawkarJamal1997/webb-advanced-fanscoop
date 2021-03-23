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
		
		const query = `SELECT id, username FROM accounts WHERE username = ? LIMIT 1`
		console.log(username);
		const values = [username]
		
		db.query(query, values, function(error, accounts){
			if(error){
				console.log(error);
				callback(['internalError'], null)
			}else if(accounts == 0){
				callback(['accountMissing'], null)
			}else{
				callback([], accounts[0])
			}
		})
		
	}

	/*
		Creates a new account.
		account: {username: "The username", password: "The password"}
		Possible errors: internalError, usernameTaken
		Success value: The username of the new account.
	*/
	exports.createAccount = function(account, callback){
		
		const query = `INSERT INTO accounts (username, hashedPassword) VALUES (?, ?)`
		const values = [account.username, account.password]
		
		db.query(query, values, function(error, account){
			if(error){
				if(error.sqlMessage.includes("usernameUnique")){
					callback(['usernameTaken'], null)
				}else{
					callback(['internalError'], null)
				}
			}else{
				console.log("db" + account.username);
				callback([], account)
			}
		})
	}

	 /*
        Sign in the user
        Possible errors: internalError
        Success value: The users account.
    */
	exports.signInAccount = function(account, callback){
		const query = `SELECT * FROM accounts WHERE username = ?`
		const values = [account.username]
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback(null, accounts[0])
			}
		})
		
	}

	return exports

}
