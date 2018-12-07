# liri-node-app

### Week 6 Homework 1


### liri-node-app

LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get concert information,find out about a song, or a movie, or just choose a random action from your own random file.

### Installs

The [package.json](https://github.com/mra-abrahamson/liri-node-app/blob/master/package.json) lists dependent node packages, but for your convenvice, these are the ones to install.

### Bands in Town Artist Events API & OMDB API 

`npm install axios`

### Spotify

Note: you will not find my spotify API keys in this repository.  you must use your own API Key and Secret key from Spotify to make this particular functionality to work. Add your keys to the `keys.js` file.

`npm i node-spotify-api`

### Moment

`npm i moment`

### DotEnv

`npm i dotenv`

### Get Started

Here's a quick rundom of the commands you can use in LIRI.

### Get Concert Info

Retrieves concert info for bands:

`nnode liri.js concert-this "Aerosmith"`

###Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song "The Sign"`

###Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this "Mr. Nobody"`

###Get Random Info

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`