const { Sequelize, DataTypes, UniqueConstraintError, DATEONLY, NOW } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    content: {
        type: DataTypes.STRING
    },
    club: {
        type: DataTypes.STRING
    },
    userOfPost: {
        type: DataTypes.STRING
    },
    dateCreated: {
        type: DataTypes.DATEONLY
    }

}, {
    timestamps: false
})

sequelize.sync({ force: true }).then(() => {
    return Post.create( {title: "title milan post 1", content: "content of post 1 milan rules", club: "milan", userOfPost: "admin", dateCreated: NOW()})
})

module.exports = function() {

    /*
    Retrieves all posts ordered by date.
    Possible errors: internalError
    Success value: The fetched posts in an array.
    */
    exports.getAllPosts = function(club, callback) {

        Post.findAll({ where: { club }, raw: true })
            .then(posts => callback([], posts))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Retrieves the post with the given id.
        Possible errors: internalError
        Success value: The fetched post, or null if no post has that id.
    */
    exports.getPostById = function(id, callback) {

        Post.findOne({ where: { id }, raw: true })
            .then(post => callback([], post))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Creates a new post.
        post: {title: "The title", content: "The content"}
        Possible errors: internalError, titleTaken
        Success value: The id of the new post.
    */
    exports.createPost = function(post, callback) {

        Post.create({ title: post.title, content: post.content, club: post.club, userOfPost: post.userOfPost.username, dateCreated: NOW() })
            .then(post => callback([], post.id))
            .then(error => {
                if (error instanceof UniqueConstraintError) {
                    callback(['titleTaken'])
                } else {
                    callback(['internalError'], null)
                }
            })

    }

    /*
    Updates the post given by id.
    Possible errors: titleTaken, internalError
    Success value: Updates the post with the given title and content.
    */
    exports.updatePostById = function(postUpdate, callback) {

        Post.findOne({ where: postUpdate.id, raw: true })
            .then(post.create(postUpdate)
                .then(error => {
                    if (error instanceof UniqueConstraintError) {
                        callback(['titleTaken'])
                    } else {
                        callback(['internalError'])
                    }
                }))
            .catch(error => callback(['internalError']))

    }

    /*
    Deletes the post given by id.
    Possible errors: internalError
    Success value: Deletes the post with the given id.
    */
    exports.deletePostById = function(id, callback) {

        Post.destroy({ where: { id }, raw: true })
            .catch(error => callback(['internalError']))
    }

    return exports

}