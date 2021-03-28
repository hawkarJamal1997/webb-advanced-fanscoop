const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const Club = sequelize.define('Club', {
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    clubImage: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

sequelize.sync({ force: true }).then(() => {
    
    return Club.create({name: "Milan", clubImage: "83561628-9a5b-4403-b803-ab913d3e1d0cMilan.svg.png"})
})

module.exports = function() {

    /*
    Retrieves all clubs ordered by name.
    Possible errors: internalError
    Success value: The fetched clubs in an array.
    */
    exports.getAllClubs = function(callback) {

        Club.findAll({ raw: true })
            .then(clubs => callback([], clubs))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Retrieves the club with the given name.
        Possible errors: internalError
        Success value: The fetched club, or null if no club has that name.
    */
    exports.getClubByName = function(name, callback) {

        Club.findOne({ where: { name }, raw: true })
            .then(club => callback([], club))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Creates a new club.
        club: {name: "The name of the club", clubImage: "The url of the image"}
        Possible errors: internalError, clubExists
        Success value: The id of the new club.
    */
    exports.createClub = function(club, callback) {

        Club.create({name: club.name, clubImage: club.image})
            .then(club => callback([]))    
            .catch(error => {
                    if (error instanceof UniqueConstraintError) {
                        callback(['clubExists'])
                    } else{
                        callback(['internalError'])
                    }
                })
            
    }

    return exports

}