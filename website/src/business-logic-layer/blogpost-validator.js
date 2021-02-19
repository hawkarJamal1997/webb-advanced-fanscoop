const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 20
const MIN_CONTENT_LENGTH = 5
const MAX_CONTENT_LENGTH = 100

exports.getErrorsNewBlogpost = function(blogpost){
	
	const errors = []

	console.log(blogpost.title, blogpost.content, "valid");
	
	// Validate title.
	if(!blogpost.hasOwnProperty("title")){
		errors.push("titleMissing")
	}else if(blogpost.title.length < MIN_TITLE_LENGTH){
		errors.push("titleTooShort")
	}else if(MAX_TITLE_LENGTH < blogpost.title.length){
		errors.push("titleTooLong")
	}

    // Validate content.
    if(!blogpost.hasOwnProperty("content")){
		errors.push("contentMissing")
	}else if(blogpost.content.length < MIN_CONTENT_LENGTH){
		errors.push("contentTooShort")
	}else if(MAX_CONTENT_LENGTH < blogpost.content.length){
		errors.push("contentTooLong")
	}
	
	return errors
}