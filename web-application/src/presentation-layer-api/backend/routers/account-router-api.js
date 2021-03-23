const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const { privateKey } = require('../../../business-logic-layer/commons')
const errorMessages = require('../../../business-logic-layer/error-messages')

module.exports = function({accountManager}){

	const router = express.Router()

	router.post("/sign-up", function(request, response){

		const account = {
			username: request.body.username,
			password: request.body.password
		}

		accountManager.createAccount(account, function(errorCodes) {
			if(errorCodes.length == 0){
                response.status(201).end()
			}else{
				const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
				response.status(400).json({errors: errors})
			}
		})
	})

	router.post("/sign-in", function(request, response){

		if(request.body.grant_type != "password"){
			response.status(400).json({error: "unsupported_grant_type"})
		}
		const account = {
			grant_type: request.body.grant_type,
			username: request.body.username,
			password: request.body.password
		}

		accountManager.signInAccount(account, function(errorCodes, account){
			if(errorCodes.length == 0){
                const payload = {
                    username: account.username
                }
                jwt.sign(payload, privateKey, function(error, token){
                    if(error){
						response.status(401).json({error: error})
					}
                    response.status(200).json({
                        "access_token": token,
						"id_token": payload
                    })
                })
			}else{
				const errors = errorCodes.map(e => errorMessages.errorTranslations[e])
				response.status(400).json({errors: errors})
			}
		})
	})

	return router
}