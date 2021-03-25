const express = require('express')
const multer = require('multer')
const errorMessages = require('../../business-logic-layer/error-messages')
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
	destination: __dirname + "/../public/uploads",
	filename: function(request, file, callback){
		callback(null, uuidv4() + file.originalname)
	}
})

const upload = multer({storage: storage}).single('clubImage')

module.exports = function({clubManager}){

	const router = express.Router()

	router.get("/", function(request, response){
		
		clubManager.getAllClubs(function(errorCodes, clubs) {
			console.log('clubs', clubs);
			const model = {
				errors: errorCodes,
				clubs: clubs,
				isLoggedIn: request.session.account
			}
			response.render("clubs-list-all.hbs", model)
		})
	})

	router.get("/create", function(request, response){
		response.render("clubs-create.hbs", {isLoggedIn: request.session.account})
	})

	router.post("/create", upload, function(request, response){
		const club = {
			name: request.body.name,
			image: request.file && request.file.filename,
			account: request.session.account
		}
		
		clubManager.createClub(club, function(errorCodes) {
			if(errorCodes.length == 0)	{
				response.redirect("/clubs")
			}else{
				const errors = errorCodes.map(e => errorMessages.errorTranslations[e])

				const model = {
					errors: errors,
					club: club,
					name: request.body.name,
					isLoggedIn: request.session.account
				}
				response.render("clubs-create.hbs", model)
			}
		})
	})
	
	return router
}

