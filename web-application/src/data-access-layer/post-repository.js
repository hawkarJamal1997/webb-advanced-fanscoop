const db = require('./db')

module.exports = function() {

    /*
    	Retrieves all posts for the given name of club ordered by date.
    	Possible errors: internalError
    	Success value: The fetched posts in an array.
    */
    exports.getAllPosts = function(club, callback) {

        const query = `SELECT * FROM posts WHERE posts.club = ? ORDER by dateCreated DESC`
        const values = [club]

        db.query(query, values, function(error, posts) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], posts)
            }
        })

    }

    /*
    	Retrieves the post with the given id.
    	Possible errors: internalError
    	Success value: The fetched post, or null if no post has that id.
    */
    exports.getPostById = function(id, callback) {

        const query = `SELECT * FROM posts WHERE id = ? LIMIT 1`
        const values = [id]
        db.query(query, values, function(error, posts) {
            if (error) {
                callback(['internalError'], null)
            } else {
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
    exports.createPost = function(post, callback) {

        const query = `INSERT INTO posts (title, content, club, userOfPost, dateCreated) VALUES (?, ?, ?, ?, curdate())`
        const values = [post.title, post.content, post.club, post.userOfPost.username]

        db.query(query, values, function(error, results) {
            if (error) {
                if (error.sqlMessage.includes("titleUnique")) {
                    callback(['titleTaken'], null)
                } else {
                    callback(['internalError'], null)
                }
            } else {
                callback([], results.insertId)
            }
        })

    }

    /*
    Updates the post given by id.
    Possible errors: titleTaken, internalError
    Success value: Updates the post with the given title and content.
    */
    exports.updatePostById = function(post, callback) {

        const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?"
        const values = [post.newTitle, post.newContent, post.id]

        db.query(query, values, function(error, results) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], results.id)
            }
        })
    }

    /*
    Deletes the post given by id.
    Possible errors: internalError
    Success value: Deletes the post with the given id.
    */
    exports.deletePostById = function(id, callback) {

        const query = `DELETE FROM posts WHERE id = ?`
        const values = [id]

        db.query(query, values, function(error) {
            if (error) {
                callback(['internalError'])
            } else {
                callback([])
            }
        })
    }

    return exports

}