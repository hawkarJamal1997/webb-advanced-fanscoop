const express = require("express")
const redis = require("redis")
const expressHandlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")

module.exports = function({variousRouter, accountRouter, clubRouter, blogpostRouter}){

	const app = express()

	// Setup express-handlebars.
	app.use(bodyParser.urlencoded({extended:false}))
	app.set("views", path.join(__dirname, "views"))

	app.engine("hbs", expressHandlebars({
		extname: "hbs",
		defaultLayout: "main",
		layoutsDir: path.join(__dirname, "layouts")
	}))

	// Handle all static files in folder "public".
	app.use(express.static(path.join(__dirname, "public")))

	// Attach all the routers.
	app.use("/", variousRouter)
	app.use("/accounts", accountRouter)
	app.use("/clubs", clubRouter)
	app.use("/blogposts", blogpostRouter)

	return app

}
