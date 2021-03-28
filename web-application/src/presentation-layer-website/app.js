const express = require('express')
const expressSession = require('express-session')
const expressHandlebars = require('express-handlebars')
const redis = require('redis')
const redisClient = redis.createClient({ host: 'redis' })
const redisStore = require('connect-redis')(expressSession)
const path = require('path')

module.exports = function({ variousRouter, accountRouter, accountRouterApi, clubRouter, clubRouterApi, postRouter, postRouterApi }) {

    const app = express()

    // Setup express-handlebars.
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.set("views", path.join(__dirname, "views"))

    // Handle all static files in folder "public".
    app.use(express.static(path.join(__dirname, "/public")))
    app.use(express.static(path.join(__dirname, "../presentation-layer-api/frontend")))

    app.use(function(request, response, next) {

        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")

        next()
    })

    app.engine("hbs", expressHandlebars({
        extname: "hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "layouts")
    }))

    app.use(expressSession({
        store: new redisStore({ client: redisClient }),
        secret: "keyboard dog",
        resave: false,
        saveUninitialized: true
    }))


    // Attach all the routers.
    app.use("/", variousRouter)
    app.use("/accounts", accountRouter)
    app.use("/api/accounts", accountRouterApi)
    app.use("/clubs", clubRouter)
    app.use("/api/clubs", clubRouterApi)
    app.use("/posts", postRouter)
    app.use("/api/posts", postRouterApi)

    return app

}