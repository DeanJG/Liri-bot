// activates .env file
require("dotenv").config()
// activates axios npm
const axios = require(`axios`)
// activates the keys stored in keys.js
let keys = require("./keys.js")
// activates the various api keys
let spotify = keys.spotify
let omdb = keys.omdb
let bands = keys.bands
// pulling command line input
let [, , action, entry] = process.argv

const reqFunc = (action, entry) => {
    switch (action) {
        case 'concert-this':

        break;
        case 'spotify-this-song':
            
        break;
        case 'movie-this':
            // axios request for omdb
            axios.get(`http://www.omdbapi.com/?apikey=${omdb.id}&t=${entry}`)
                .then(({ data }) => {
                    console.log(`
                    Title: ${data.Title},
                    Year: ${data.Year},
                    IMDB Rating: ${data.imdbRating},
                    Tomatoes Rating: ${data.Ratings[1].Value},
                    Origin Country: ${data.Country},
                    Language(s): ${data.Language},
                    Plot: ${data.Plot},
                    Actors: ${data.Actors}
                    `)
                })
                .catch(e => {
                    console.log(e);
                })
        break;
        case 'do-what-it-says':
            
        break;
        default:
        break
    }
}
reqFunc(action, entry)
