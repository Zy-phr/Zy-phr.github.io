// =====================================================
// DEPENDENCIES
// =====================================================

const Express = require("express");
const Burger = require("../models/burger.js"); 

// =====================================================
// ROUTE HANDLERS
// =====================================================

// Add a new burger to the db.

function addBurger(req, res) {
	Burger.add(req.body.burger_name)
		.then( () => { res.redirect("/"); })
		.catch( (reason) => {
	
			res.redirect("/");
		});		
}

// Devour a burger and redirects to root.

function devourBurger(req, res) {
	Burger.devour(req.params.id)
		.then( () => { res.redirect("/"); } )
		.catch( (reason) => { throw reason; } );
}

// Burgers and add burger form

function renderMain(response) {
	Burger.getAllBurgers()
		.then((burgers) => {

	
			response.render("index", { burgers: burgers });
		});
}

// =====================================================
// ROUTING
// =====================================================

let router = Express.Router();

router.get("/", (req, res) => { renderMain(res); });

router.post("/", addBurger);

router.put("/:id", devourBurger);

// Create router
module.exports = router;