const LIMIT = require("./commons")

exports.getErrorsNewClub = function(club){
	
	const errors = []

	//validate user is admin as only admin is allowed to create clubs
	if(club.account === undefined || !(club.account.username == "admin")){
		errors.push("notAuthorized")
		return errors
	}
	
	// Validate name.
	if(!club.hasOwnProperty("name")){
		errors.push("nameMissing")
	}else if(club.name && club.name.length < LIMIT.MIN_TITLE_LENGTH){
		errors.push("clubNameTooShort")
	}else if(club.name && LIMIT.MAX_TITLE_LENGTH < club.name.length){
		errors.push("clubNameTooLong")
	} else if(!club.image) {
		errors.push("clubNoImage")
	}
	
	return errors
	
}