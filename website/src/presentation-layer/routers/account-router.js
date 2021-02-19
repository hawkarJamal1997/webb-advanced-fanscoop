const express = require('express')

module.exports = function({accountManager}){

	const router = express.Router()

	router.get("/sign-up", function(request, response){
		response.render("accounts-sign-up.hbs")
	})

	router.post("/sign-up", function(request, response){
		
		const account = {
			username: request.body.username,
			password: request.body.password
		}

		accountManager.createAccount(account, function(errorCodes, id) {
			if(errorCodes.length == 0){
				response.redirect("/accounts")
			}else{

				const errorTranslations = {
					usernameTooShort: "The username can't be shorter than 3 characters.",
					usernameTooLong: "The username can't be longer than 15 characters.",
					usernameTaken: "Username is already taken.",
					passwordLengthError: "The password must be between 8 and 30 characters.",
					internalError: "Can't carry out the request now."
				}

				const errorMessages = errorCodes.map(e => errorTranslations[e])

				const model = {
					errors: errorMessages,
					username: account.username,
					password: account.password
				}
				response.render("accounts-sign-up.hbs", model)
			}
		})
	})

	router.get("/sign-in", function(request, response){
		response.render("accounts-sign-in.hbs")
	})

	router.post("/sign-in", function(request, response){
		const username = request.body.username
		const password = request.body.password
		console.log(username, password, "sdad")

		response.redirect("/")
	})

	router.get("/", function(request, response){
		accountManager.getAllAccounts(function(errorCodes, accounts) {
			const model = {
				errors: errorCodes,
				accounts: accounts
			}
			response.render("accounts-list-all.hbs", model)
		})
	})

	router.get('/:username', function(request, response){
		
		const username = request.params.username
		
		accountManager.getAccountByUsername(username, function(errorCodes, account){
			const model = {
				errors: errorCodes,
				account: account
			}
			response.render("accounts-show-one.hbs", model)
		})
		
	})

	return router
}