// ==============================================================
// DEPENDENCIES
// ==============================================================
const Express = require("express");
const BodyParser = require("body-parser");
const Exphbs = require("express-handlebars");
const MethodOverride = require("method-override");
const Routes = require("./controllers/burgers_controller.js");

let app = Express();
let PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(Express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));

// implement method override middleware
app.use(MethodOverride("_method"));

// Setup Handlebars
app.engine("handlebars", Exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connecting router
app.use("/", Routes);

app.listen(PORT, () => {
	console.log("Server listening on: http://localhost:%s", PORT);
});