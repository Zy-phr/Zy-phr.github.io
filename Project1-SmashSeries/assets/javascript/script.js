var welcomeMessage = [
    "=====================================",
    "",
    "=====================================",
          "WELCOME TO SMASH TV SERIES",
    "=====================================",
    "",
    "====================================="];

function WELCOME () {
    for (let i = 0; i < welcomeMessage.length; i++) {
        console.log(welcomeMessage[i]);
    }
};

    console.log(moment().format('dddd, MMMM D YYYY, h:mm:ss A'));

WELCOME();

/* 
=====================================
Initialize Firebase
===================================== 
*/

var config = {
  apiKey: "AIzaSyDW96BlZ6-mDMsZKstfIbEQoODgvf1gyxc",
  authDomain: "smash-tv-series.firebaseapp.com",
  databaseURL: "https://smash-tv-series.firebaseio.com",
  projectId: "smash-tv-series",
  storageBucket: "smash-tv-series.appspot.com",
  messagingSenderId: "1043377830505"
};

firebase.initializeApp(config);

var database = firebase.database();

/* 
=====================================
Firebase Google Sign In/Out Auth
===================================== 
*/

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        $('.signIn').hide();
        $('.signOut').show();
        $('.video').hide();
        $('.seriesList').show();
        $('.search-bar').show();
        
    } else {
        // No user is signed in.
        $('.signOut').hide();
        $('.seriesList').hide();
        $('.search-bar').hide();   
    }

});

var provider = new firebase.auth.GoogleAuthProvider();
// var userId = firebase.auth().currentUser.uid;
function googleSignIn() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var displayName = user.displayName;
        console.log("Signed In")
        // console.log(user);
        console.log(displayName);

        window.location = 'search.html';
        return false;

    }).catch(function() {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code)
        console.log(errror.message)
    });
};

function googleSignOut() {
    firebase.auth().signOut()
    .then(function() {
        console.log("Signed Out")

        $('.signOut').hide();
        $('.seriesList').hide();
        $('.search-bar').hide();
        $('.signIn').show();
        $('.video').show();
        window.location = 'index.html';
        return false;

    },function(error) {
        console.log("Signed Out Failed")
    });
};

/* 
=====================================
Dropdown menu
===================================== 
*/

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("display");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('display')) {
        openDropdown.classList.remove('display');
      }
    }
  }
}

/* 
=====================================
Movie Database API 
===================================== 
*/

// function to store SHOW ID in sessionStorage
function showSelected(id) {
    sessionStorage.setItem('showId', id);
    window.location = 'tvSeries.html';
    return false;
};

// function to store ACTOR ID in sessionStorage
function actorSelected(id) {
    sessionStorage.setItem('actorId', id);
    window.location = 'cast.html';
    return false;
};

// moviedb API Key
var api_key = "e61e9fb239b05528d06ac5dc3e44f900";

// Popular TV Series IDs
var tvseries = ["1418", "60573", "60625", "60574", "1399", "1402", "66732", "10283", "67744", "75758", "186", "1668", "70573", "46533", "65495", "70453", "1413", "1424", "63247", "71116", "30991", "2382", "2316", "1408", "44217"]
console.log(tvseries);

var random = tvseries[Math.floor(Math.random() * tvseries.length)];

// Var containing image path for TV series poster
var image_path = "https://image.tmdb.org/t/p/w500";

function popularSeries() {

    for (let i = 0; i < tvseries.length; i++) {
        var tvSeries = tvseries[i];
        console.log(tvSeries);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/tv/" + tvSeries + "?api_key=" + api_key,
            "method": "GET",
            "headers": {},
            "data": "{}"
        }

        $.ajax(settings).done(function (response) {
            // console.log(response);
            console.log(response);

            var tRow = $(".popular");
            var tContent = $("<td>");
            tContent.attr("id", "series" + i);
            var tvseriesPoster = $("<img>");
            tvseriesPoster.attr("src", image_path + response.poster_path);
            tvseriesPoster.addClass("series-poster");
            var tvseriesTitle = $("<p>").html(response.name);
            tvseriesTitle.addClass("series-title");
            var tvseriesRating = $("<p>").html(response.vote_average + "/10");
            tvseriesRating.addClass("series-rating");

            $(tContent).append(tvseriesPoster, tvseriesTitle, tvseriesRating);
            tRow.append(tContent);

            var seriesID = response.id;
            console.log(seriesID);
             // wrap tvseriesPoster to create link to TVSERIES website
            var posterWrap = $("<a>");
            posterWrap.click(function(){
                sessionStorage.setItem('showId', seriesID);
                window.location = 'tvSeries.html';
                return false;
            });
            tvseriesPoster.wrap(posterWrap);
        });
    };
};

popularSeries();

$(document).ready(() => {
    $("#searchForm").on("submit", (e) => {
        let searchText = $("#searchText").val();
        getSeries(searchText);
        e.preventDefault();
    });
});

// function to GET tvSeries info and create html to display search results
function getSeries(searchText) {
    axios.get("https://api.themoviedb.org/3/search/tv?api_key=" + api_key + "&query=" + searchText)
        .then((response) => {
            console.log(response);
            let series = response.data.results;
            let output = "";
            $.each(series, (index, show) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <a onclick="showSelected('${show.id}')" href="#">
                        <img src="${"https://image.tmdb.org/t/p/w185" + show.poster_path}" class="series-logo">
                        </a>
                        <p>${show.name}<p>
                        <a onclick="showSelected('${show.id}')" class="btn btn-primary" href="#">T.V. Series Details</a>
                    </div>
                </div>    
                `;

            });

            $("#tvShow").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
};

/* 
=====================================
tvSeries.html
===================================== 
*/

// function to GET tvSeries info and create html to display show contents for the 'clicked' show
function getShow() {
    // reference for showId in session storage
    let showId = sessionStorage.getItem('showId');

    axios.get("https://api.themoviedb.org/3/tv/" + showId + "?api_key=" + api_key + "&append_to_response=external_ids")

        .then((response) => {
            console.log(response);
            let show = response.data;
            let image_path = "https://image.tmdb.org/t/p/w500"
            let output = `

                <div class="row">
                    <div class="col-md-3">
                      <a href="${show.homepage}" target="_blank">
                        <img src="${"https://image.tmdb.org/t/p/w185" + show.poster_path}" class="thumbnail">  
                      </a> 
                    </div>
                    <div class="col-md-9">
                        <h2>${show.name}
                        <p></p>
                        <img src="${image_path + show.networks[0].logo_path}" class="network-logo">
                        <a href="http://imdb.com/title/${show.external_ids.imdb_id}" target="_blank" class="btn btn-warning">IMDb</a> 
                        <a href="https://www.facebook.com/${show.external_ids.facebook_id}" target="_blank" class="btn btn-primary">Facebook</a>
                        <a href="search.html" class="btn btn-danger">Back to Search</a>
                        </h2> 
                      
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${show.genres[0].name} </li>
                            <li class="list-group-item"><strong>Released:</strong> ${show.first_air_date} </li>
                            <li class="list-group-item"><strong>Seasons:</strong> ${show.number_of_seasons} </li>
                            <li class="list-group-item"><strong>Rating:</strong> ${show.vote_average} </li>
                            <li class="list-group-item"><strong>Created By:</strong> ${show.created_by[0].name} </li>
                            <li class="list-group-item"><strong>Homepage:</strong>
                            <a href="${show.homepage}" target="_blank"> ${show.homepage} </a>
                            </li> 
                        </ul>
                    </div>
                </div>

                <div class="row">
                    <div class="well col-md-12">
                        <h3>Plot</h3>
                            ${show.overview}   
                    </div>
                
            `;

            $("#show").html(output);

        })
        .catch((err) => {
            console.log(err);
        });

};

getShow();

// function to GET cast info and create html to display cast contents for the 'clicked' show
function getCast() {
    // reference for showId in session storage
    let showId = sessionStorage.getItem('showId');
    // reference for actorId in session storage
    let actorId = sessionStorage.getItem('actorId');

    axios.get("https://api.themoviedb.org/3/tv/" + showId + "?api_key=" + api_key + "&append_to_response=credits")

        .then((response) => {
            console.log(response);
            let show = response.data;
            let image_path = "https://image.tmdb.org/t/p/w500"
            let output = `

                <div class="row">
                    <div class="well col-md-12">
                    <h3>Cast</h3>
                    <div class="1st-row">
                        <div class="cast col-md-2">
                            <h5>${show.credits.cast[0].name}</h5>
                            <a onclick="actorSelected('${show.credits.cast[0].id}')"href="#">
                            <img src="${image_path + show.credits.cast[0].profile_path}" class="cast-logo">
                            </a> 
                            <p>${show.credits.cast[0].character}</p>
                        </div>
                        <div class="cast col-md-2">
                            <h5>${show.credits.cast[1].name}</h5>
                            <a onclick="actorSelected('${show.credits.cast[1].id}')"href="#">
                            <img src="${image_path + show.credits.cast[1].profile_path}" class="cast-logo">
                            </a> 
                            <p>${show.credits.cast[1].character}</p>
                        </div>
                        <div class="cast col-md-2">
                            <h5>${show.credits.cast[2].name}</h5>
                            <a onclick="actorSelected('${show.credits.cast[2].id}')"href="#">
                            <img src="${image_path + show.credits.cast[2].profile_path}" class="cast-logo">
                            </a> 
                            <p>${show.credits.cast[2].character}</p>
                        </div>
                        <div class="cast col-md-2">
                            <h5>${show.credits.cast[3].name}</h5>
                            <a onclick="actorSelected('${show.credits.cast[3].id}')"href="#">
                            <img src="${image_path + show.credits.cast[3].profile_path}" class="cast-logo">
                            </a> 
                            <p>${show.credits.cast[3].character}</p>
                        </div>
                        <div class="cast col-md-2">
                            <h5>${show.credits.cast[4].name}</h5>
                            <a onclick="actorSelected('${show.credits.cast[4].id}')"href="#">
                            <img src="${image_path + show.credits.cast[4].profile_path}" class="cast-logo">
                            </a> 
                            <p>${show.credits.cast[4].character}</p>
                        </div>
                        <div class="cast col-md-2">
                            <h5>${show.credits.cast[5].name}</h5>
                            <a onclick="actorSelected('${show.credits.cast[5].id}')"href="#">
                            <img src="${image_path + show.credits.cast[5].profile_path}" class="cast-logo">
                            </a> 
                            <p>${show.credits.cast[5].character}</p>
                        </div>
                    </div>
                </div>

            `;

            $("#cast").html(output);

        })
        .catch((err) => {
            console.log(err);
        });
            
};

getCast();
    
/* 
=====================================
cast.html
===================================== 
*/

// function to GET actor info and create html to display the actors info for the 'clicked' actor
function getActor() {
    // reference for actorId in session storage
    let actorId = sessionStorage.getItem('actorId');

    axios.get("https://api.themoviedb.org/3/person/" + actorId + "?language=en-US&api_key=" + api_key)

        .then((response) => {
            console.log(response);
            let actor = response.data;
            let image_path = "https://image.tmdb.org/t/p/w500"
            let output = `

                <div class="row">
                    <div class="col-md-3">
                        <img src="${"https://image.tmdb.org/t/p/w185" + actor.profile_path}" class="actor_thumbnail">  
                    </div>
                    <div class="col-md-9">
                        <h2>${actor.name}
                        <p></p>
                        <a href="https://www.imdb.com/name/${actor.imdb_id}" target="_blank" class="btn btn-warning">IMDb</a> 
                        <a href="tvSeries.html" class="btn btn-success">Back to T.V. Series Details</a>
                        <a href="search.html" class="btn btn-danger">Back to Search</a>
                        </h2> 
                      
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Known for:</strong> ${actor.known_for_department} </li>
                            <li class="list-group-item"><strong>Birthday:</strong> ${actor.birthday} </li>
                            <li class="list-group-item"><strong>Place of Birth:</strong> ${actor.place_of_birth} </li>
                            <li class="list-group-item"><strong>Popularity:</strong> ${actor.popularity}/10 </li>
                        </ul>
                    </div>
                </div>

                <div class="row">
                    <div class="well col-md-12">
                        <h3>Bio</h3>
                            ${actor.biography}   
                    </div>
            `;

            $("#actor").html(output);

        })
        .catch((err) => {
            console.log(err);
        });

};

$('#signIN').on('click',function(event){
    event.preventDefault();
    console.log("Signing In");
    var signInScope = this;
    signIn(signInScope);
});

getActor();

/* 
=====================================
Contact.html
===================================== 
*/

// Variables
var database = firebase.database();
var firstName = "";
var lastName = "";
var email = "";
var favorite = "";
var message = "";


// Capture Button Click
$("#add-comment").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    firstName = $("#fName-input").val().trim();
    lastName = $("#lName-input").val().trim();
    email = $("#email-input").val().trim();
    favorite = $("#favorite-input").val().trim();
    message = $("#message-input").val().trim();

    // Code for "Pushing values in the database"
    database.ref().child('contact').push({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        FavoriteSeries: favorite,
        Message: message,
    });
});

// Reference Firebase when page loads and train added to firebase
database.ref().child('contact').on('value', function (snapshot) {
    $('tbody').empty();

    snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val());
        var cContact = childSnapshot.val();
        var cClass = "comment" + childSnapshot.key;

        $('tbody').append(
            "<tr class=" + cClass + ">" +
            "<td>" + cContact.FirstName + "</td>" +
            "<td>" + cContact.FavoriteSeries + "</td>");
    });

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




