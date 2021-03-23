const LIMIT = require("./commons")

exports.getErrorsNewPost = function(post){
	
	const errors = []

	if(post.userOfPost === undefined){
		errors.push("notLoggedIn")
		return errors
	}
	
	// Validate title.
	if(!post.hasOwnProperty("title")){
		errors.push("titleMissing")
	}else if(post.title.length < LIMIT.MIN_TITLE_LENGTH){
		errors.push("titleTooShort")
	}else if(LIMIT.MAX_TITLE_LENGTH < post.title.length){
		errors.push("titleTooLong")
	}

    // Validate content.
    if(!post.hasOwnProperty("content")){
		errors.push("contentMissing")
	}else if(post.content.length < LIMIT.MIN_CONTENT_LENGTH){
		errors.push("contentTooShort")
	}else if(LIMIT.MAX_CONTENT_LENGTH < post.content.length){
		errors.push("contentTooLong")
	}
	
	return errors
}

exports.getErrorsUpdatePost = function(post){

	const errors = []

	if(post.userOfPost === undefined){
		errors.push("notLoggedIn")
		return errors
	}else if(!(post.verifyUser == post.userOfPost)){
		errors.push("notRightUser")
		return errors
	}
	
	// Validate title.
	if(!post.hasOwnProperty("newTitle")){
		errors.push("titleMissing")
	}else if(post.newTitle.length < LIMIT.MIN_TITLE_LENGTH){
		errors.push("titleTooShort")
	}else if(LIMIT.MAX_TITLE_LENGTH < post.newTitle.length){
		errors.push("titleTooLong")
	}

    // Validate content.
    if(!post.hasOwnProperty("newContent")){
		errors.push("contentMissing")
	}else if(post.newContent.length < LIMIT.MIN_CONTENT_LENGTH){
		errors.push("contentTooShort")
	}else if(LIMIT.MAX_CONTENT_LENGTH < post.newContent.length){
		errors.push("contentTooLong")
	}
	
	return errors

}

exports.getErrorsDeletePost = function(post){
	const errors = []

	if(post.userOfPost === undefined){
		errors.push("notLoggedIn")
		return errors
	}else if(!(post.verifyUser == post.userOfPost)){
		errors.push("notRightUser")
		return errors
	}
}