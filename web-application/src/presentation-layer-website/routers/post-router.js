const express = require('express')
const errorMessages = require('../../business-logic-layer/error-messages')

module.exports = function({ postManager }) {

    const router = express.Router()

    // Get all posts from club specified in param
    router.get("/:club", function(request, response) {

        const club = request.params.club

        postManager.getAllPosts(club, function(errorCodes, posts) {
            const model = {
                errorCodes: errorCodes,
                posts: posts,
                club: club,
                isLoggedIn: request.session.account
            }
            response.render("posts-list-all.hbs", model)
        })
    })

    // Create post for club specified in param GET
    router.get("/create/:club", function(request, response) {
        const model = {
            club: request.params.club,
            isLoggedIn: request.session.account
        }
        response.render("posts-create.hbs", model)
    })

    // Create post for club specified in param POST
    router.post("/create/:club", function(request, response) {
        const post = {
            title: request.body.title,
            content: request.body.content,
            club: request.params.club,
            userOfPost: request.session.account
        }
        postManager.createPost(post, function(errorCodes, id) {
            if (errorCodes.length == 0) {
                response.redirect(`/posts/${request.params.club}/${id}`)
            } else {

                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])

                const model = {
                    errors: errors,
                    club: request.params.club,
                    title: request.body.title,
                    content: request.body.content,
                    isLoggedIn: request.session.account
                }
                response.render("posts-create.hbs", model)
            }
        })
    })

    // Get post in club with the id specified in the params
    router.get('/:club/:id', function(request, response) {

        const id = request.params.id

        postManager.getPostById(id, function(errorCodes, post) {
            const model = {
                errors: errorCodes,
                post: post,
                isLoggedIn: request.session.account
            }
            response.render("posts-show-one.hbs", model)
        })

    })

    return router

}