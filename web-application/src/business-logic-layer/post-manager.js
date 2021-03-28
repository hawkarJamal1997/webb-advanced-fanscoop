const postValidator = require('./post-validator')

module.exports = function({ postRepository }) {

    const exports = {}

    exports.getAllPosts = function(club, callback) {
        postRepository.getAllPosts(club, function(error, posts) {

            //trim the date to only show date in format yyyy-mm-dd
            posts = posts.filter(post => {
                post.dateCreated = (post.dateCreated + "").substring(0, 16)
                return post
            })
            callback(error, posts)
        })
    }

    exports.createPost = function(post, callback) {
        // Validate the post.
        const errors = postValidator.getErrorsNewPost(post)

        if (0 < errors.length) {
            callback(errors, null)
            return
        }
        postRepository.createPost(post, callback)
    }

    exports.getPostById = function(id, callback) {
        postRepository.getPostById(id, function(error, post) {

            //trim the date to only show date in format yyyy-mm-dd
            post.dateCreated = (post.dateCreated + "").substring(0, 16)
            callback(error, post)
        })
    }

    exports.updatePostById = function(post, callback) {

        const errors = postValidator.getErrorsUpdatePost(post)

        if (0 < errors.length) {
            callback(errors, null)
            return
        }
        postRepository.updatePostById(post, callback)
    }

    exports.deletePostById = function(post, callback) {

        const errors = postValidator.getErrorsDeletePost(post)
        if (0 < errors.length) {
            callback(errors, null)
            return
        }
        postRepository.deletePostById(post.id, callback)
    }

    return exports
}