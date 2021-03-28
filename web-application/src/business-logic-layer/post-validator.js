const LIMIT = require("./commons")

exports.getErrorsNewPost = function(post) {

    const errors = []

    // Validate a user needs to login to create a post
    if (post.userOfPost === undefined) {
        errors.push("notLoggedIn")
        return errors
    }

    // Validate title.
    if (!(/\w+/).test(post.title)) {
        errors.push("titleMissing")
        return errors
    } else if (post.title.length < LIMIT.MIN_TITLE_LENGTH) {
        errors.push("titleTooShort")
    } else if (LIMIT.MAX_TITLE_LENGTH < post.title.length) {
        errors.push("titleTooLong")
    }

    // Validate content.
    if (!(/\w+/).test(post.content)) {
        errors.push("contentMissing")
        return errors
    } else if (post.content.length < LIMIT.MIN_CONTENT_LENGTH) {
        errors.push("contentTooShort")
    } else if (LIMIT.MAX_CONTENT_LENGTH < post.content.length) {
        errors.push("contentTooLong")
    }

    return errors
}

exports.getErrorsUpdatePost = function(post) {

    const errors = []

    // Validate that the user is the right owner of the post
    if (!(post.verifyUser == post.userOfPost)) {
        errors.push("notRightUser")
        return errors
    }

    // Validate title.
    if (!(/\w+/).test(post.newTitle)) {
        errors.push("titleMissing")
        return errors
    } else if (post.newTitle.length < LIMIT.MIN_TITLE_LENGTH) {
        errors.push("titleTooShort")
    } else if (LIMIT.MAX_TITLE_LENGTH < post.newTitle.length) {
        errors.push("titleTooLong")
    }

    // Validate content.
    if (!(/\w+/).test(post.newContent)) {
        errors.push("contentMissing")
        return errors
    } else if (post.newContent.length < LIMIT.MIN_CONTENT_LENGTH) {
        errors.push("contentTooShort")
    } else if (LIMIT.MAX_CONTENT_LENGTH < post.newContent.length) {
        errors.push("contentTooLong")
    }

    return errors

}

exports.getErrorsDeletePost = function(post) {

    const errors = []

    if (!(post.verifyUser == post.userOfPost))
        errors.push("notRightUser")

    return errors
}