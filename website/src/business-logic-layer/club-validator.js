
exports.getErrorsNewClub = function(club){
	
	const errors = []

	console.log(club.name, "valid");
	
	// Validate name.
	if(!club.hasOwnProperty("name")){
		errors.push("nameMissing")
	}
	
	return errors
	
}