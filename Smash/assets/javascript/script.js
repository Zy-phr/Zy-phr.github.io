// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyDW96BlZ6-mDMsZKstfIbEQoODgvf1gyxc",
//   authDomain: "smash-tv-series.firebaseapp.com",
//   responsebaseURL: "https://smash-tv-series.firebaseio.com",
//   projectId: "smash-tv-series",
//   storageBucket: "smash-tv-series.appspot.com",
//   messagingSenderId: "1043377830505"
// };
// firebase.initializeApp(config);

$('.search-bar').hide();

// Auth using a popup.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

$(document).on('click', '.signIn', function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Google Access Token.
   var token = result.credential.accessToken;
   // The signed-in user info.
   var user = result.user;
   $('.content').show();
   loggedIn();
   
  });
  $(this).removeClass('signIn')
    .addClass('signOut')
    .html('Sign Out Of Google');
});

$(document).on('click', '.signOut', function () {
  firebase.auth().signOut().then(function() {
    $('.search-bar').hide();
  }, function(error) {
    // An error happened.
  });
  $(this).removeClass('signOut')
    .addClass('signIn')
    .html('Sign In With Google');
});



var api_key = "e61e9fb239b05528d06ac5dc3e44f900";

// moviedb API Key
var apiKey = "b18573629b801e93be5aeb3a7f3303f8"

function showSelected(id) {
    sessionStorage.setItem('showId', id);
    window.location = 'tvSeries.html';
    return false;

}

var tvseries = ["1418", "60573", "60625", "60574", "1399", "1402", "66732", "10283", "67744", "75758", "186"]

console.log(tvseries);

var image_path = "https://image.tmdb.org/t/p/w500"

function popularSeries() {

    for (let i = 0; i < tvseries.length; i++) {
        var tvSeries = tvseries[i];
        console.log(tvSeries);


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/tv/" + tvSeries + "?api_key=" + apiKey,
            "method": "GET",
            "headers": {},
            "data": "{}"
        }

        $.ajax(settings).done(function (response) {
            // console.log(response);
            console.log(response);

            var tRow = $("tr");
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
                        <img src="${"https://image.tmdb.org/t/p/w185" + show.poster_path}">
                        <h5>${show.name}</h5>
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
}

function getShow() {
    let showId = sessionStorage.getItem('showId');

    // axios.get("https://api.themoviedb.org/3/tv/" + showId + "?api_key=" + api_key)

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
                        <img src="${image_path + show.networks[0].logo_path}" class="network-logo">
                        <a href="http://imdb.com/title/${show.external_ids.imdb_id}" target="_blank" class="btn btn-warning">IMDb</a> 
                        <a href="https://www.facebook.com/${show.external_ids.facebook_id}" target="_blank" class="btn btn-primary">Facebook</a>
                        <a href="index.html" class="btn btn-danger">Back to Search</a>
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

function getCast() {
    let showId = sessionStorage.getItem('showId');

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
                        <p>${show.credits.cast[0].character}</p><img src="${image_path + show.credits.cast[0].profile_path}" class="cast-logo"><h5>${show.credits.cast[0].name}</h5> 
                    </div>
                    <div class="cast col-md-2">
                        <p>${show.credits.cast[1].character}</p><img src="${image_path + show.credits.cast[1].profile_path}" class="cast-logo"><h5>${show.credits.cast[1].name}</h5>
                    </div>
                    <div class="cast col-md-2">
                        <p>${show.credits.cast[2].character}</p><img src="${image_path + show.credits.cast[2].profile_path}" class="cast-logo"><h5>${show.credits.cast[2].name}</h5>
                    </div>
                    <div class="cast col-md-2">
                        <p>${show.credits.cast[3].character}</p><img src="${image_path + show.credits.cast[3].profile_path}" class="cast-logo"><h5>${show.credits.cast[3].name}</h5>
                    </div>
                    <div class="cast col-md-2">
                        <p>${show.credits.cast[4].character}</p><img src="${image_path + show.credits.cast[4].profile_path}" class="cast-logo"><h5>${show.credits.cast[4].name}</h5>
                    </div>
                    <div class="cast col-md-2">
                        <p>${show.credits.cast[5].character}</p><img src="${image_path + show.credits.cast[5].profile_path}" class="cast-logo"><h5>${show.credits.cast[5].name}</h5>
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
        