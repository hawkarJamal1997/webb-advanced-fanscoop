const clubValidator = require('./club-validator')

module.exports = function({clubRepository}){

	const exports = {}

	exports.getAllClubs = function(callback){
		clubRepository.getAllClubs(callback)
	}
	
	exports.createClub = function(club, callback){
		
		// Validate the club.
		const errors = clubValidator.getErrorsNewClub(club)
		
		if(0 < errors.length){
			callback(errors, null)
			return
		}
		clubRepository.createClub(club, callback)
		
	}
	
	exports.getClubByName = function(name, callback){
		clubRepository.getClubByName(name, callback)
	}


	return exports
}

