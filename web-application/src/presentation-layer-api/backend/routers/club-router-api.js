const express = require('express')


module.exports = function({ clubManager }) {

    const router = express.Router()

    // Get all clubs
    router.get("/", function(request, response) {
        clubManager.getAllClubs(function(errorCodes, clubs) {
            const model = {
                errors: errorCodes,
                clubs: clubs
            }
            response.status(200).json(model)
        })
    })

    return router
}