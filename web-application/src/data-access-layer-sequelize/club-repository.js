const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const Club = sequelize.define('club', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

sequelize.sync({ force: true })

module.exports = function(){

    /*
    Retrieves all clubs ordered by name.
    Possible errors: internalError
    Success value: The fetched clubs in an array.
    */
    exports.getAllClubs = function (callback){

        club.findAll({ raw: true })
            .then(clubs => callback([], clubs))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Retrieves the club with the given name.
        Possible errors: internalError
        Success value: The fetched club, or null if no club has that name.
    */
    exports.getClubByName = function (name, callback){

        club.findOne({ where: { name }, raw: true })
            .then(club => callback([], club))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Creates a new club.
        club: {name: "The name of the club"}
        Possible errors: internalError, clubExists
        Success value: The id of the new club.
    */
    exports.createClub = function (club, callback){

        club.create(club)
            .then(club => callback([], club.id))
            .then(error => {
                if (error instanceof UniqueConstraintError){
                    callback(['clubExists'], null)
                } else {
                    callback(['internalError'], null)
                }
            })

    }
    
    return exports
    
}
