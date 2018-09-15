// =====================================================
// orm.js
// =====================================================

const Connection = require("./connection.js");

// Query to select all data in table. Returns a promise passing 
// for the selected data.

function selectAll(table) {

    // create a promise
    
	return new Promise( ( resolve, reject ) => {
		let sql = "SELECT * FROM ??";

        // run query to get all data in table
        
		Connection.query( sql, table, ( err, data ) => {

            // run rejection callback on error
            
			if(err) return reject(err);

            // pass data to success callback
            
			return resolve(data);
		});
	} );
}

// Query to add a burger to the burgers table

function insertOne(table, data) {
	return new Promise( ( resolve, reject ) => {

		// initialize sql statement
		let sql = "INSERT INTO ?? SET ?";

		// run query to get all data in table
		Connection.query( sql, [table, data], ( err, data ) => {
			if(err) return reject(err);
			return resolve(data);
		});
	} );
}

// Query to update 

function updateOne(table, where, data) {
	return new Promise( ( resolve, reject ) => {
		
		// initialize sql statement
		let sql = "UPDATE ?? SET ? WHERE ? LIMIT 1";

		// run query to get all data in table
		Connection.query( sql, [table, data, where], ( err, data ) => {
			if(err) return reject(err);
			return resolve(data);
		});
	} );
}

module.exports = {
	selectAll: selectAll,
	insertOne: insertOne,
	updateOne: updateOne
};