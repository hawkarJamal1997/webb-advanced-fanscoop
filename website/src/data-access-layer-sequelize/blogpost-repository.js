const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const blogpost = sequelize.define('blogpost', {
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    content: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

sequelize.sync({force: true})

/*
	Retrieves all blogposts ordered by title.
	Possible errors: internalError
	Success value: The fetched blogposts in an array.
*/
exports.getAllBlogposts = function(callback){

	blogpost.findAll({raw: true})
        .then(blogposts => callback([], blogposts))
        .catch(error => callback(['internalError'], null))
	
}

/*
	Retrieves the blogpost with the given title.
	Possible errors: internalError
	Success value: The fetched blogpost, or null if no blogpost has that title.
*/
exports.getBlogpostByTitle = function(title, callback){
	
	blogpost.findOne({where: {title}, raw: true})
        .then(blogpost => callback([], blogpost))
        .catch(error => callback(['internalError'], null))

}

/*
	Creates a new blogpost.
	blogpost: {title: "The title", content: "The content"}
	Possible errors: internalError, titleTaken
	Success value: The id of the new blogpost.
*/
exports.createBlogpost = function(blogpost, callback){
	
	blogpost.create(blogpost)
        .then(blogpost => callback([], blogpost.id))
        .then(error => {
            if(error instanceof UniqueConstraintError){
                callback(['titleTaken'], null)
            }else{
                callback(['internalError'], null)
            }
        })
	
}