// Use donenv package to add code to read and set any environment variables
require("dotenv").config();

// Add the code required to import, file and store it in a variable
var keys = require('./keys.js');
// Twitter 
var twitter = require('twitter');
// Spotify
var Spotify = require('node-spotify-api');
// Request
var request = require('request');
// Title of Movie 
var movieName = process.argv[3];
// Take on of the following commands
var liriReturn = process.argv[2];
// Use fs node package, LIRI will take the text inside of random.txt
var fs = require('fs');


// Switch statements to get 'tweets', 'spotifySong', 'movie', 'doIt'
switch (liriReturn) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();
        break;

    // Command line instructions
    default: 
        console.log("-----------------------------------------------");
        console.log(' ');
        console.log("\n" + "Type one of these command after 'node liri.js': " + "\n" +
        "my-tweets" + "\n" +
        "spotify-this-song 'song title' " + "\n" +
        "movie-this 'movie title' " + "\n" +
        "do-what-it-says ");
        console.log(' ');
        console.log("-----------------------------------------------");
};

// Node.js Twitter function request
function tweets() {
    // Keys for Twitter Api stored in .env
    var client = new twitter(keys.twitter);
    // NPM package for Twitter and user name 
    var params = { screen_name: 'Zyphr_24', limit: 20 };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

   
            console.log("My last 20 Tweets");

            for (var i = 0; i < tweets.length; i++) {
            // Pull request and show my last 20 tweets on twitter
            var myTweetResults = 
                "Tweet #" + (i+1) + "\r\n" +
	    		"Tweet: " + tweets[i].text + "\r\n" +
	    		"Created at: " + tweets[i].created_at
               
            console.log("-----------------------------------------------");
            console.log(' ');
            console.log(myTweetResults);
            console.log(' ');
            console.log("-----------------------------------------------");
            };

        } else {
            console.log("error: " + err);
            return;
        };
    });
};

// Node.js Spotify function request
function spotifySong(trackName) {
    // Keys for Spotify Api stored in .env
    var spotify = new Spotify(keys.spotify);

    var trackName = process.argv[3];

    if (!trackName) {
        trackName = "The Sign";
    };

    // NPM package node-spotify-API
    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },

    function (err, data) {
        if (!err) {

            console.log("My Spotify Song Result");

            var trackInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (trackInfo[i] != undefined) {
                    // Pull request and show results for Artist, Song Name, Preview, Album
                    var spotifyResults =
                        "Artist: " + trackInfo[i].artists[0].name + "\n" +
                        "Song: " + trackInfo[i].name + "\n" +
                        "Preview URL: " + trackInfo[i].preview_url + "\n" +
                        "Album: " + trackInfo[i].album.name + "\n"

                    console.log("-----------------------------------------------");
                    console.log(' ');
                    console.log(spotifyResults);
                    console.log(' ');
                    console.log("-----------------------------------------------");
                };
            };
        } else {
            console.log("error: " + err);
            return;
        };

    });
};

// Node.js OMDB function request
function movie() {

    //using movieName from var list at top
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {

            console.log("My Movie Result");

            //Pull requested amd show results for Title, Year, IMDB Rating, Rotten Tomatoes Rating, Origin Country, Language, Plot, Actors
            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

            console.log("-----------------------------------------------");
            console.log(' ');
            console.log(queryUrlResults);
            console.log(' ');
            console.log("-----------------------------------------------");
        } else {
            console.log("error: " + err);
            return;
        };

    });
};


// This block of code creates a file called "random.txt"
function doIt() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If code experiences any errors it will log the error to console
        if (error) {
            return console.log(error);
        }

        console.log("Do what I say!");

        var dataArr = data.split(", ");

        console.log("-----------------------------------------------");
        console.log(' ');
        console.log(data);
        console.log(dataArr);
        console.log(dataArr[1]);
        console.log(' ');
        console.log("-----------------------------------------------");
       
    });
};



