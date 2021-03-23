const express = require('express')
const jwt = require('jsonwebtoken')
const { privateKey } = require('../../../business-logic-layer/commons')
const errorMessages = require('../../../business-logic-layer/error-messages')

module.exports = function({postManager}){

    const router = express.Router()

    // get all blog posts
    router.get('/:club', function(request, response){

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

    router.post('/:club', authenticateToken, function(request, response){
        console.log(request.user);
        const post = { 
            title: request.body.title,
            content: request.body.content,
            club: request.params.club,
            userOfPost: request.user
        }
        postManager.createPost(post, function(errorCodes, post){
            if(errorCodes.length == 0){
                response.status(201).end()
            }else{
                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                response.status(400).json({erros: errors})
            }
        })
    })

    router.put('/:club/:title', authenticateToken, function(request, response){

        const title = request.params.title

        postManager.getPostByTitle(title, function(errorCodes, post){
            if(errorCodes.length == 0){
                const updatePost = {
                    newTitle: request.body.title,
                    newContent: request.body.content,
                    title: post.title,
                    userOfPost: post.userOfPost,
                    verifyUser: request.user
                }
                postManager.updatePostByTitle(updatePost, function(errorCodes, post){
                    if(errorCodes.length == 0){
                        response.status(201).end()
                    }else{
                        const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                        response.status(400).json({erros: errors})
                    }
                })
            }else{
                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                response.status(400).json({erros: errors})
            }
        })
    })

    router.delete('/:club/:title', authenticateToken, function(request, response){
        
        const title = request.params.title
        
        postManager.getPostByTitle(title, function(errorCodes, post){
            if(errorCodes.length == 0){
                const updatePost = {
                    title: post.title,
                    userOfPost: post.userOfPost,
                    verifyUser: request.user
                }
                postManager.deletePostByTitle(updatePost, function(errorCodes){
                    if(errorCodes == 0){
                        response.status(204).end()
                    }else{
                        const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                        response.status(400).json({erros: errors})
                    }
                })
            }else{
                const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
                response.status(400).json({erros: errors})
            }
        })
            
    })


    function authenticateToken(request, response, next){

        //Get authorization token from the header
        const accessToken = request.header("Authorization").substring("Bearer ".length)
        if(accessToken == null){
            response.status(401).end()
        }

        jwt.verify(accessToken, privateKey, function(error, payload){
            if(error){
                response.status(401).json({error: error})
            }
            request.user = payload
            next()
        })
    }

    return router
}