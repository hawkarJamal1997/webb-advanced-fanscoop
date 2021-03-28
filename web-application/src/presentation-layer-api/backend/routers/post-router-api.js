const express = require('express')
const jwt = require('jsonwebtoken')
const { privateKey } = require('../../../business-logic-layer/commons')
const errorMessages = require('../../../business-logic-layer/error-messages')

module.exports = function({ postManager }) {

    const router = express.Router()

    // Get all posts from a club specified in param
    router.get('/:club', function(request, response) {

        const club = request.params.club

        postManager.getAllPosts(club, function(errorCodes, posts) {
            const model = {
                errorCodes: errorCodes,
                posts: posts,
                club: club
            }
            response.status(200).json(model)
        })
    })

    // Create post for the club specified in the param
    router.post('/:club', authenticateToken, function(request, response) {
        const post = {
            title: request.body.title,
            content: request.body.content,
            club: request.params.club,
            userOfPost: request.user
        }
        postManager.createPost(post, function(errorCodes, post) {
            if (errorCodes.length == 0) {
                response.status(201).json({ message: "created!" })
            } else {
                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                response.status(400).json({ errors: errors })
            }
        })
    })

    // Update post with the id from that club specified in params
    router.put('/:club/:id', authenticateToken, function(request, response) {

        const id = request.params.id

        postManager.getPostById(id, function(errorCodes, post) {
            if (errorCodes.length == 0) {
                const updatePost = {
                    newTitle: request.body.title,
                    newContent: request.body.content,
                    title: post.title,
                    userOfPost: post.userOfPost,
                    verifyUser: request.user.username,
                    id: id
                }
                postManager.updatePostById(updatePost, function(errorCodes, post) {
                    if (errorCodes.length == 0) {
                        response.status(201).json({ message: "created!" })
                    } else {
                        const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                        response.status(400).json({ errors: errors })
                    }
                })
            } else {
                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                response.status(400).json({ errors: errors })
            }
        })
    })

    // Delete post with the id from that club specified in params
    router.delete('/:club/:id', authenticateToken, function(request, response) {
        const id = request.params.id

        postManager.getPostById(id, function(errorCodes, post) {
            if (errorCodes.length == 0) {
                const deletePost = {
                    id: post.id,
                    userOfPost: post.userOfPost,
                    verifyUser: request.user.username || ''
                }

                postManager.deletePostById(deletePost, function(errorCodes) {
                    if (errorCodes == 0) {
                        response.status(204).end()
                    } else {
                        const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                        response.status(400).json({ errors: errors })
                    }
                })
            } else {
                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                response.status(400).json({ erros: errors })
            }
        })
    })

    // authenticate token
    function authenticateToken(request, response, next) {

        //Get authorization token from the header
        const accessToken = request.header("Authorization").substring("Bearer ".length)
        if (accessToken == null) {
            response.status(401).end()
        }

        jwt.verify(accessToken, privateKey, function(error, payload) {
            if (error) {
                response.status(401).json({ error: error })
            }
            request.user = payload
            next()
        })
    }

    return router
}