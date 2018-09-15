// ===========================================================================
// Load Data
// ===========================================================================

var friends = require("../data/friends.js");

// ===========================================================================
// Routing
// ===========================================================================

module.exports = function(app) {

	// return json of all friends
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	// Return a json of match from friends and add user to friends
	app.post("/api/friends", function(req, res, next) {
		// get the friend object returned by the user
		let user = req.body;

		// validate the user data
		try {
	
			// Apply basic validation in case input is submitted by means other than
			// the form on survey.html. There is no need to escape any script or 
			// mysql tokens. Friend Finder uses memory for storing user input. 
			// The methods which render data from user input do not allow execution
			// of scripts entered as input.
			user.name = user.name.toString();
			user.photo = user.photo.toString();
			if ( user.name.length < 1 ) throw "Invalid user name. User name must have at least one character.";
	
			// validate and parse the scores array
			if ( user.scores.length !== 10 ) throw "Unexpected count of scores from the survey. There must be exactly 10 scores.";
			user.scores = user.scores.map(function(score) {	
				score = parseInt(score);
				if ( score < 1 || score > 5 ) throw "Invalid score. Score must be between 1 and 5 inclusive.";
				return score;
			});
		}
		catch ( err ) {
	
			// handle user input error. returns status code 500
			return next(err);
		}

		// find the closest match to the user
		let matchScore; // comparison score for match
		let match; // friend object

		friends.forEach(function(friend) {

			// calculate a net score as the sum of the differences between each score. |user - friend|
			let compScore = friend.scores.reduce(function(accumulator, value, currentIndex) {
				return Math.abs(user.scores[currentIndex] - value) + accumulator;
			}, 0);

			// update match if compScore is less than the score for the current match or if
			// match not yet set (first friend in friends array)
			if ( !match || compScore < matchScore ) {
				match = friend;
				matchScore = compScore;
			}
		});

		// add the user to friends data
		friends.push(req.body);

		// return the match
		res.json(match);
	});
};