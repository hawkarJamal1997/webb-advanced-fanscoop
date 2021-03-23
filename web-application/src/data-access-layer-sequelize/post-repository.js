const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')

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
    }
}, {
    timestamps: false
})

sequelize.sync({ force: true })

module.exports = function(){

    /*
    Retrieves all posts ordered by title.
    Possible errors: internalError
    Success value: The fetched posts in an array.
    */
    exports.getAllPosts = function (club, callback){

        Post.findAll({ where: { club }, raw: true})
            .then(posts => callback([], posts))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Retrieves the post with the given title.
        Possible errors: internalError
        Success value: The fetched post, or null if no post has that title.
    */
    exports.getPostByTitle = function (title, callback){

        Post.findOne({ where: { title }, raw: true })
            .then(post => callback([], post))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Creates a new post.
        post: {title: "The title", content: "The content"}
        Possible errors: internalError, titleTaken
        Success value: The id of the new post.
    */
    exports.createPost = function (post, callback){

        Post.create({title: post.title, content: post.content, club: post.club, userOfPost: post.userOfPost.username})
            .then(post => callback([], post))
            .then(error => {
                if (error instanceof UniqueConstraintError){
                    callback(['titleTaken'], null)
                } else {
                    callback(['internalError'], null)
                }
            })

    }

    /*
    Updates the post given by title.
    Possible errors: titleTaken, internalError
    Success value: Updates the post with the given title and content.
    */
    exports.updatePostByTitle = function (postUpdate, callback){

        Post.findOne({ where: postUpdate.title, raw: true })
            .then(post.create(postUpdate)
                .then(postUpdate => callback([], postUpdate.id))
                .then(error => {
                    if (error instanceof UniqueConstraintError){
                        callback(['titleTaken'], null)
                    } else {
                        callback(['internalError'], null)
                    }
                }))
            .catch(error => callback(['internalError'], null))

    }

    /*
    Deletes the post given by title.
    Possible errors: internalError
    Success value: Deletes the post with the given id.
    */
    exports.deletePostByTitle = function (title, callback){

        Post.destroy({ where: { title }, raw: true })
            .catch(error => callback(['internalError'], null))
    }

    return exports

}
