# liri-node-app

### Week 6 Homework 1


LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get concert information,find out about a band, a song, or a movie, or just choose a random action from your own random file.

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

    1. concert-this 'any band name'
    2. spotify-this-song 'any song name'
    3. movie-this 'any movie name'
    4. do-what-it-says

    ![Alt text](relative/path/to/img.jpg?raw=true "Title")

### Get Concert Info

Retrieves concert info for bands:  

example command-
`nnode liri.js concert-this "Aerosmith"`

![Alt text](relative/path/to/img.jpg?raw=true "Title")

###Get Song Info

Retrieves song information for a track:

example command-
`node liri.js spotify-this-song "The Sign"`

![Alt text](relative/path/to/img.jpg?raw=true "Title")

###Get Movie Info

Retrieves movie information for a movie:

example command-
`node liri.js movie-this "Mr. Nobody"`

![Alt text](relative/path/to/img.jpg?raw=true "Title")

###Get Random Info

Gets random text inside a file and does what it says:

example command-
`node liri.js do-what-it-says`

In this case it will pull up the spotify API and look up "I want it that way" from the Backstreet Boys.

![Example of 'do-what-it-says' output](/screenshots/do-what-it-says.png?raw=true "'do-what-it-says' output")