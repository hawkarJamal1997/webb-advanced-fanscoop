const postValidator = require('./post-validator')

module.exports = function({postRepository}){

	const exports = {}

	exports.getAllPosts = function(club, callback){
		postRepository.getAllPosts(club, callback)
	}
	
	exports.createPost = function(post, callback){
		// Validate the post.
		const errors = postValidator.getErrorsNewPost(post)
		
		if(0 < errors.length){
			callback(errors, null)
			return
		}
		console.log(post);
		postRepository.createPost(post, callback)
	}
	
	exports.getPostByTitle = function(title, callback){
		postRepository.getPostByTitle(title, callback)
	}

	exports.updatePostByTitle = function(post, callback){
		
		const errors = postValidator.getErrorsUpdatePost(post)

		if(0 < errors.length){
			callback(errors, null)
			return
		}
		postRepository.updatePostByTitle(post, callback)
	}

	exports.deletePostByTitle = function(post, callback){

		const errors = postValidator.getErrorsDeletePost(post)
		if(0 < errors.length){
			callback(errors, null)
			return
		}
		postRepository.deletePostByTitle(post, callback)
	}

	return exports
}

