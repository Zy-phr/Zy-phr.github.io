// =====================================================
// burger.js
// =====================================================

const ORM = require("../config/orm.js");

// Gets all records from burgers table.

function getAllBurgers() {
	return ORM.selectAll("burgers");
}

// Adds burger to burgers table. 
function add(name, devoured = false) {

	let err = false;
	
	if ( name.length < 1 ) { 
		err = new Error("Invalid burger name. Burger name must have at least one character.");
	}

	let newBurger = {
		burger_name: name,
		devoured: devoured
	};

	// return a promise
	return new Promise( (resolve, reject) => { 
		if (err) { return reject(err); }
		return ORM.insertOne( "burgers", newBurger).then(resolve);
	});
}

// Updates information wirh id

function devour(id) {
	return ORM.updateOne("burgers", { id: id }, { devoured: true });
}

module.exports = {
	getAllBurgers: getAllBurgers,
	add: add,
	devour: devour
};