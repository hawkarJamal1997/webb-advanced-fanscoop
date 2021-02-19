const db = require('./db')

module.exports = function(){

	/*
	Retrieves all clubs ordered by name.
	Possible errors: internalError
	Success value: The fetched clubs in an array.
	*/
	exports.getAllClubs = function(callback){
		
		const query = `SELECT * FROM clubs ORDER BY id`
		const values = []
		
		db.query(query, values, function(error, clubs){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], clubs)
			}
		})
		
	}

	/*
		Retrieves the club with the given name of club.
		Possible errors: internalError
		Success value: The fetched club, or null if no club has that name.
	*/
	exports.getClubByName = function(name, callback){
		
		const query = `SELECT * FROM clubs WHERE name = ? LIMIT 1`
		const values = [name]
		
		db.query(query, values, function(error, clubs){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], clubs[0])
			}
		})
	
	}


	/*
		Creates a new club.
		club: {name: "The name of the club"}
		Possible errors: internalError, clubExists
		Success value: The id of the new club.
	*/
	exports.createClub = function(club, callback){
		
		const query = `INSERT INTO clubs (name) VALUES (?)`
		const values = [club.name]
		
		db.query(query, values, function(error, results){
			if(error){
				if(error.sqlMessage.includes("nameUnique")){
					callback(['clubExists'], null)
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

