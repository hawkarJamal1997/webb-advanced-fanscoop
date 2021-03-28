const db = require('./db')

module.exports = function() {

    /*
    Retrieves all clubs ordered by name.
    Possible errors: internalError
    Success value: The fetched clubs in an array.
    */
    exports.getAllClubs = function(callback) {

        const query = `SELECT * FROM clubs ORDER BY id`

        db.query(query, function(error, clubs) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback(null, clubs)
            }
        })

    }

    /*
    	Retrieves the club with the given name of club.
    	Possible errors: internalError
    	Success value: The fetched club, or null if no club has that name.
    */
    exports.getClubByName = function(name, callback) {

        const query = `SELECT * FROM clubs WHERE name = ? LIMIT 1`
        const values = [name]

        db.query(query, values, function(error, clubs) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], clubs[0])
            }
        })

    }

    /*
    	Creates a new club.
    	club: {name: "The name of the club", clubImage: "the url of the image"}
    	Possible errors: internalError, clubExists
    	Success value: New club was created.
    */
    exports.createClub = function(club, callback) {
        const query = `INSERT INTO clubs (name, clubImage) VALUES (?, ?)`
        const values = [club.name, club.image]

        db.query(query, values, function(error) {
            if (error) {
                if (error.sqlMessage.includes("nameUnique")) {
                    callback(['clubExists'])
                } else {
                    callback(['internalError'])
                }
            } else {
                callback([])
            }
        })

    }

    return exports

}