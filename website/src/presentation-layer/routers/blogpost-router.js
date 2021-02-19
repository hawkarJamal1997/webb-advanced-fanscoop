const express = require('express')

module.exports = function({blogpostManager}){

	const router = express.Router()

	router.get("/", function(request, response){
		blogpostManager.getAllBlogposts(function(errorCodes, blogposts) {
			const model = {
				errorCodes: errorCodes,
				blogposts: blogposts
			}
			response.render("blogposts-list-all.hbs", model)
		})
	})

	router.get("/create", function(request, response){
		const club = request.query.club

		response.render("blogposts-create.hbs", {club})
	})

	router.post("/create", function(request, response){
		
		const { title , content, club } = request.body
		const blogpost = { title, content, club }

		blogpostManager.createBlogpost(blogpost, function(errorCodes, id) {
			if(errorCodes.length == 0){
				response.redirect(`/clubs/${blogpost.club}`)
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

	router.get('/:title', function(request, response){
		
		const title = request.params.title
		
		blogpostManager.getBlogpostByTitle(title, function(errorCodes, blogpost){
			const model = {
				errors: errorCodes,
				blogpost: blogpost
			}
			response.render("blogposts-show-one.hbs", model)
		})
		
	})

	return router

}

