const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')

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

sequelize.sync({ force: true }).then(() => {

    //username= "admin, password = "admin123"
    return Account.create({ username: "admin", password: "$2b$10$jJR8txhaCVmAztUQwFYqe.NHsfGM8kF/hP0uZYAgbESMGx0X/OWyy" });
})

module.exports = function() {

    /*
    Retrieves all accounts ordered by username.
    Possible errors: internalError
    Success value: The fetched accounts in an array.
    */
    exports.getAllAccounts = function(callback) {

        Account.findAll({ raw: true })
            .then(accounts => callback([], accounts))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Retrieves the account with the given username.
        Possible errors: internalError
        Success value: The fetched account, or null if no account has that username.
    */
    exports.getAccountById = function(id, callback) {

        Account.findOne({ where: { id }, raw: true })
            .then(account => callback([], account))
            .catch(error => callback(['internalError'], null))

    }

    /*
        Creates a new account.
        account: {username: "The username", password: "The password"}
        Possible errors: internalError, usernameTaken
        Success value: The the new account.
    */
    exports.createAccount = function(account, callback) {

        Account.create({ username: account.username, password: account.password })
            .then(account => callback([], account))
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
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
    exports.signInAccount = function(account, callback) {

        Account.findOne({ where: { username: account.username }, raw: true })
            .then(account => callback([], account))
            .catch(error => callback(['internalError'], null))
    }

    return exports

}
