const express = require('express')
const errorMessages = require('../../business-logic-layer/error-messages')

module.exports = function({ accountManager }) {

    const router = express.Router()

    router.get("/sign-up", function(request, response) {
        response.render("accounts-sign-up.hbs", { isLoggedIn: request.session.account })
    })

    router.post("/sign-up", function(request, response) {
        const account = {
            username: request.body.username,
            password: request.body.password
        }

        accountManager.createAccount(account, function(errorCodes, account) {
            if (errorCodes.length == 0) {
                response.render("accounts-sign-in.hbs", { username: account.username })
            } else {

                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])

                const model = {
                    errors: errors,
                    username: request.body.username,
                    password: request.body.password,
                    isLoggedIn: request.session.account
                }
                response.render("accounts-sign-up.hbs", model)
            }
        })
    })

    router.get("/sign-in", function(request, response) {
        response.render("accounts-sign-in.hbs", { isLoggedIn: request.session.account })
    })

    router.post("/sign-in", function(request, response) {
        const account = {
            username: request.body.username,
            password: request.body.password
        }

        accountManager.signInAccount(account, function(errorCodes, account) {
            if (errorCodes.length == 0) {
                request.session.account = account
                response.redirect("/accounts")
            } else {

                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])

                const model = {
                    errors: errors,
                    username: request.body.username,
                    password: request.body.password,
                    isLoggedIn: request.session.account
                }
                response.render("accounts-sign-in.hbs", model)
            }
        })
    })

    router.get("/", function(request, response) {

        accountManager.getAllAccounts(function(errorCodes, accounts) {
            const model = {
                errors: errorCodes,
                accounts: accounts,
                isLoggedIn: request.session.account
            }
            response.render("accounts-list-all.hbs", model)
        })
    })

    router.get('/:id', function(request, response) {
        
        const id = request.params.id

        accountManager.getAccountById(id, function(errorCodes, account) {
            const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
            const model = {
                errors: errors,
                account: account,
                isLoggedIn: request.session.account
            }
            response.render("accounts-show-one.hbs", model)
        })

    })

    router.post("/logout", function(request, response) {
        request.session.destroy(function() {
            response.redirect("/")
        })
    })

    return router
}