const db = require('./db')

module.exports = function(){

	/*
		Retrieves all posts for the given name of club.
		Possible errors: internalError
		Success value: The fetched posts in an array.
	*/
	exports.getAllPosts = function(name, callback){

		const query = `SELECT * FROM posts INNER JOIN clubs ON posts.club = clubs.name WHERE posts.club = ?`
		const values = [name]
		
		db.query(query, values, function(error, posts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], posts)
			}
		})
		
	}

	/*
		Retrieves the post with the given title.
		Possible errors: internalError
		Success value: The fetched post, or null if no post has that title.
	*/
	exports.getPostByTitle = function(title, callback){
		
		const query = `SELECT * FROM posts WHERE title = ? LIMIT 1`
		const values = [title]
		
		db.query(query, values, function(error, posts){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], posts[0])
			}
		})
		
	}

	/*
		Creates a new post.
		post: {title: "The title", content: "The content"}
		Possible errors: internalError, titleTaken
		Success value: The id of the new post.
	*/
	exports.createPost = function(post, callback){
		
		const query = `INSERT INTO posts (title, content, club, userOfPost) VALUES (?, ?, ?, ?)`
		const values = [post.title, post.content, post.club, post.userOfPost.username]
		console.log(values);
		
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

	/*
    Updates the post given by title.
    Possible errors: titleTaken, internalError
    Success value: Updates the post with the given title and content.
    */
	exports.updatePostByTitle = function(post, callback){

		const query = "UPDATE posts SET title = ?, content = ? WHERE title = ?"
		const values = [post.newTitle, post.newContent, post.title]

		db.query(query, values, function(error, post){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], post)
			}
		})
	}

	/*
    Deletes the post given by title.
    Possible errors: internalError
    Success value: Deletes the post with the given id.
    */
	exports.deletePostByTitle = function(title, callback){

		const query = `DELETE FROM posts WHERE title = ?`
		const values = [title]

		db.query(query, values, function(error, results){
			if(error){
				callback(['internalError'], null)
			}else{
				callback([], results.deletedTitle)
			}
		})
	}

	return exports
}