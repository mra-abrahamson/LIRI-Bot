require("dotenv").config();

/* LIRI is a Language Interpretation and Recognition Interface.
It takes in an action request and an optional argument,
such as a movie-title, both using node's process.argv.
Action requests include retrieving song information from Spotify API, and movie information from OMDB.
LIRI also calls out to a random text file that can include any action or argument.
LIRI includes logging support both to the console and an output file, log.txt.
It uses the npm node module, 'simple-node-logger', for it's logging solution.
*/ 

// Required NPM modules and files.
// ____________________________________________________________________________________

// NPM module used to access Bands in Town Artist Events API.
var bandsInTown = require("bandsInTown");

// NPM module used to access Spotify API.
var spotify = require("spotify");

//Key for using Spotify API.
var spotifyID = require("./keys.js");

// NPM module used to access OMDB API.
var request = require("request");

// Controller and required parameters.
// ____________________________________________________________________________________


// Action requested.
var action = process.argv[2];

// Optional argument to request specific information.
// Based on action type.
var argument = "";

// Controller function that determines what action is taken,
// and specific data to complete that action.
doSomething(action, argument);

// Switch operation used to determin which action to take.
function doSomething(action, argument) {

	/* Controls optional third argument.
	Defines specific data relating to the action.
	For example, when requesting song information,
	you can pass in a song title.
	*/ 
	argument = getThirdArgument();

	switch (action) {
		
		// Gets list of a bands concerts.
        case "concert-this": 
        
        // First gets bands name argument.
        var bandName = argument;
        
        // If no band name provided, defaults to specific band.
        if (bandName === "") {
            lookupSpecificBand();
        }

        // Else look up band based on band name.
        else {
            getBandInfo("Aerosmith");
        }
        break;
        


		// Gets song information.
		case "spotify-this-song":
		
		// First gets song title argument.
		var songTitle = argument;

		// If no song title provided, defaults to specific song.
		if (songTitle === "") {
			lookupSpecificSong();
        }

		// Else looks up song based on song title.
		 else {
			getSongInfo("The Sign");
		}
        break;
        


		// Gets movie information.
		case "movie-this":

		// First gets movie title argument.
		var movieTitle = argument;

		// If no movie title provided, defaults to specific movie.
		if (movieTitle === "") {
			getMovieInfo("Mr. Nobody");

		// Else looks up song based on movie title.
		} else {
			getMovieInfo(movieTitle);
		}
        break;
        


		// Gets text inside file, and uses it to do something.
		case "do-what-it-says": 
		doWhatItSays();
		break;
	}
}

// Returns optional third argument, for example,
// when requesting song information, include a song title.
function getThirdArgument() {

	// Stores all possible arguments in array.
	argumentArray = process.argv;

	// Loops through words in node argument.
	for (var i = 3; i < argumentArray.length; i++) {
		argument += argumentArray[i];
	}
	return argument;
}

// Calls Bands in Town Artist Events API for concert dates.
function getBandInfo(bandName) {

    	// Runs a request to the Bands in Town API with the band name specified.
	var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers band info.
	    var bandName = JSON.parse(body);

    // Calls Bands in Town to get info.
    bandsInTown.search({type: 'name', query: bandName}, function(err, data) {
        if (err) {
            console.log.error(err);
            return
        }

        //output of band info.
        console.log("Name of venue: " + venue);
        console.log("Venue location: " + location);
        console.log("Date of the event:" + (moment.date));
    });
}


// Calls Spotify API to retrieve song information for song title.
function getSongInfo(songTitle) {

	// Calls Spotify API to retrieve a track.
	spotify.search({type: 'track', query: songTitle}, function(err, data) {
		if (err) {
			console.log.error(err);
			return
		}

        // what's the best way to get only one song?? Probably not all this below huh???
        
		var artistsArray = data.tracks.items[0].album.artists;

		// Array to hold artist names, when more than one artist exists for a song.
		var artistsNames = [];

		// Pushes artists for track to array.
		for (var i = 0; i < artistsArray.length; i++) {
			artistsNames.push(artistsArray[i].name);
		}

		// Converts artists array to string, and makes it pretty.
		var artists = artistsNames.join(", ");

		// Prints the artist(s), track name, preview url, and album name.
		console.log("Artist(s): " + artists);
		console.log("Song: " + data.tracks.items[0].name)
		console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url)
		console.log("Album Name: " + data.tracks.items[0].album.name);
	});
	
}

// When no song title provided, defaults to specific song, The Sign.
function lookupSpecificSong() {

	// Calls Spotify API to retrieve a specific track, The Sign, Ace of Base.
	spotify.lookup({type: 'track', id: spotifyID}, function(err, data) {
		if (err) {
			console.log.error(err);
			return
		}

		// Prints the artist, track name, preview url, and album name.
		console.log("Artist: " + data.artists[0].name);
		console.log("Song: " + data.name);
		console.log("Spotify Preview URL: " + data.preview_url);
		console.log("Album Name: " + data.album.name);
	});
}

// Passes a query URL to OMDB to retrieve movie information for movie title.
// If no movie title provided, defaults to the movie, Mr. Nobody.
function getMovieInfo(movieTitle) {

	// Runs a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers movie info.
	    var movie = JSON.parse(body);

	    // Prints out movie info.
	    console.log("Movie Title: " + movie.Title);
	    console.log("Release Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
	    console.log("Country Produced In: " + movie.Country);
	    console.log("Language: " + movie.Language);
	    console.log("Plot: " + movie.Plot);
	    console.log("Actors: " + movie.Actors);

	    // Had to set to array value, as there seems to be a bug in API response,
	    // that always returns N/A for movie.tomatoRating.
	    console.log("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
	    console.log("Rotten Tomatoes URL: " + movie.tomatoURL);
	  }
	});
}
