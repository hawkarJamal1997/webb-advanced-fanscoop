const db = require('./db')

module.exports = function(){

	/*
		Retrieves all blogposts for the given name of club.
		Possible errors: internalError
		Success value: The fetched blogposts in an array.
	*/
	exports.getAllBlogposts = function(name, callback){
		const query = `SELECT * FROM blogposts INNER JOIN clubs ON blogposts.club = clubs.name WHERE clubs.name = ?`
		const values = [name]
		
		db.query(query, values, function(error, clubblogposts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], clubblogposts)
			}
		})
		
	}

	/*
		Retrieves the blogpost with the given title.
		Possible errors: internalError
		Success value: The fetched blogpost, or null if no blogpost has that title.
	*/
	exports.getBlogpostByTitle = function(title, callback){
		
		const query = `SELECT * FROM blogposts WHERE title = ? LIMIT 1`
		const values = [title]
		
		db.query(query, values, function(error, blogposts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], blogposts[0])
			}
		})
		
	}

	/*
		Creates a new blogpost.
		blogpost: {title: "The title", content: "The content"}
		Possible errors: internalError, titleTaken
		Success value: The id of the new blogpost.
	*/
	exports.createBlogpost = function(blogpost, callback){
		console.log("blogpost", blogpost)
		
		const query = `INSERT INTO blogposts (title, content, club) VALUES (?, ?, ?)`
		const values = [blogpost.title, blogpost.content, blogpost.club]
		
		db.query(query, values, function(error, results){
			if(error){
				if(error.sqlMessage.includes("titleUnique")){
					callback(['titleTaken'], null)
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