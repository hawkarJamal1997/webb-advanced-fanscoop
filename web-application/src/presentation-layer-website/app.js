const express = require('express')
const expressSession = require('express-session')
const expressHandlebars = require('express-handlebars')
const redis = require('redis')
const redisClient = redis.createClient({host:'redis'})
const redisStore = require('connect-redis')(expressSession)
const path = require('path')

module.exports = function({variousRouter, accountRouter, accountRouterApi, clubRouter, postRouter, postRouterApi}){

	const app = express()

	// Setup express-handlebars.
	app.use(express.urlencoded({extended:false}))
	app.set("views", path.join(__dirname, "views"))

	// Handle all static files in folder "public".
	app.use(express.static(path.join(__dirname, "/public")))
	app.use(express.static(path.join(__dirname, "../presentation-layer-api/frontend")))

	app.use(function(request, response, next){
		
		response.setHeader("Access-Control-Allow-Origin", "*")
		response.setHeader("Access-Control-Allow-Methods", "*")
		response.setHeader("Access-Control-Allow-Headers", "*")
		response.setHeader("Access-Control-Expose-Headers", "*")
		
		next()
	})

	app.engine("hbs", expressHandlebars({
		extname: "hbs",
		defaultLayout: "main",
		layoutsDir: path.join(__dirname, "layouts")
	}))

	redisClient.on('error', function(error){
		console.log("Could not establish connection with redis" + error)
	})

	redisClient.on('connect', function(error){
		console.log("Connected to redis")
	})

	app.use(expressSession({
		store: new redisStore({ client: redisClient }),
		secret: "keyboard dog",
		resave: false,
		saveUninitialized: true
	}))


	// Attach all the routers.
	app.use("/", variousRouter)
	app.use("/accounts", accountRouter)
	app.use("/Apiaccounts", accountRouterApi)
	app.use("/clubs", clubRouter)
	app.use("/posts", postRouter)
	app.use("/apiposts", postRouterApi)

	return app

}