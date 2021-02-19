const express = require('express')

module.exports = function({clubManager, blogpostManager}){

	const router = express.Router()

	router.get("/", function(request, response){
		clubManager.getAllClubs(function(errorCodes, clubs) {
			const model = {
				errors: errorCodes,
				clubs: clubs
			}
			response.render("clubs-list-all.hbs", model)
		})
	})

	router.get("/create", function(request, response){
		response.render("clubs-create.hbs")
	})

	router.post("/create", function(request, response){
		
		const club = {
			name: request.body.name
		}
		clubManager.createClub(club, function(errorCodes, id) {
			if(errorCodes.length == 0){
				response.redirect("/clubs")
			}else{
				
				const errorTranslations = {
					clubExists: "A club with this name has already been made.",
					internalError: "Can't carry out the request now."
				}

				const errorMessages = errorCodes.map(e => errorTranslations[e])

				const model = {
					errors: errorMessages,
					name: club.name
				}
				response.render("clubs-create.hbs", model)
			}
		})
	})



	router.get('/:name', function(request, response){

		const name = request.params.name

		blogpostManager.getAllBlogposts(name, function(errorCodes, blogposts) {
			const model = {
				errorCodes: errorCodes,
				name: name,
				blogposts: blogposts
			}
			response.render("blogposts-list-all.hbs", model)
		})
	})

	router.get("/:name/create-blogpost", function(request, response){

		const model = {name: request.params.name}
		
		response.render("blogposts-create.hbs", model)
	})
	
	router.post("/:name/create-blogpost", function(request, response){
		

		const blogpost = {
			title: request.body.title, 
			content: request.body.content,
			club: request.params.name
		}

		blogpostManager.createBlogpost(blogpost, function(errorCodes, id) {
			if(errorCodes.length == 0){
				response.redirect("/clubs")
			}else{
				
				const errorTranslations = {
					titleTooShort: "The title can't be shorter than 3 characters.",
					titleTooLong: "The title can't be longer than 15 characters.",
					titleTaken: "A blogpost with this title has already been made.",
					contentTooShort: "The content can't be shorter than 5 characters",
					contentTooLong: "The content can't be longer than 100 characters",
					internalError: "Can't carry out the request now."
				}

				const errorMessages = errorCodes.map(e => errorTranslations[e])

				const model = {
					errors: errorMessages,
					title: blogpost.title,
					content: blogpost.content
				}
				response.render("blogposts-create.hbs", model)
			}
		})
	})

	return router
}

