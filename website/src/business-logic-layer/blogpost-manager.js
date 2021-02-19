const blogpostValidator = require('./blogpost-validator')

module.exports = function({blogpostRepository}){

	const exports = {}

	exports.getAllBlogposts = function(name, callback){
		blogpostRepository.getAllBlogposts(name, callback)
	}
	
	exports.createBlogpost = function(blogpost, callback){
		// Validate the blogpost.
		const errors = blogpostValidator.getErrorsNewBlogpost(blogpost)
		
		if(0 < errors.length){
			callback(errors, null)
			return
		}
		blogpostRepository.createBlogpost(blogpost, callback)
	}
	
	exports.getBlogpostByTitle = function(title, callback){
		blogpostRepository.getBlogpostByTitle(title, callback)
	}

	return exports
}

