const { Sequelize, DataTypes, UniqueConstraintError, Model } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const Account = sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

sequelize.sync({ force: true })

module.exports = function(){

    /*
    Retrieves all accounts ordered by username.
    Possible errors: internalError
    Success value: The fetched accounts in an array.
    */
    exports.getAllAccounts = function (callback){

        Account.findAll({ raw: true })
            .then(accounts => callback([], accounts))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Retrieves the account with the given username.
        Possible errors: internalError
        Success value: The fetched account, or null if no account has that username.
    */
    exports.getAccountByUsername = function (username, callback){

        Account.findOne({ where: { username }, raw: true })
            .then(account => callback([], account))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Creates a new account.
        account: {username: "The username", password: "The password"}
        Possible errors: internalError, usernameTaken
        Success value: The username of the new account.
    */
    exports.createAccount = function (account, callback){

        Account.create({ username: account.username, hashedPassword: account.password, userOfPost: account.userOfPost })
            .then(account => callback([], account))
            .catch(error => {
                if (error instanceof UniqueConstraintError){
                    callback(['usernameTaken'], null)
                } else {
                    callback(['internalError'], null)
                }
            })

    }

    /*
        Sign in the user
        Possible errors: internalError
        Success value: The users account.
    */
    exports.signInAccount = function (account, callback){
        
        Account.findOne({ where: {username: account.username}, raw: true })
            .then(account => {
                callback([], account)
            })
            .catch(error => callback(['internalError'], null))

    }

    return exports

}
