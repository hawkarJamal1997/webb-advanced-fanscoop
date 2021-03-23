const express = require('express')

module.exports = function(){

	
	const router = express.Router()

	router.get("/", function(request, response){
		response.render("home.hbs",{isLoggedIn: request.session.account})
	})

	router.get("/about", function(request, response){
		response.render("about.hbs", {isLoggedIn: request.session.account})
	})

	router.get("/contact", function(request, response){
		response.render("contact.hbs", {isLoggedIn: request.session.account})
	})

	return router
}
