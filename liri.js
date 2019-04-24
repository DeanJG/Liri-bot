// activates .env file
require("dotenv").config()
// activates axios npm
const axios = require(`axios`)
// activates moment npm
const moment = require(`moment`)
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
            axios.get(`https://rest.bandsintown.com/artists/${entry}/events?app_id=${bands.id}`)
                .then(({ data }) => {
                    const {name, country, region, city} = data[0].venue
                    console.log(`
                    Venue: ${name}
                    ----------------------------------------
                    Location: ${city} ${region}, ${country}
                    ----------------------------------------
                    Show Date(Month/Day/Year): ${moment(data[0].datetime).format(`MM/DD/YYYY`)}
                    `)
                })
        break;
        case 'spotify-this-song':
            
        break;
        case 'movie-this':
            // axios request for omdb
            axios.get(`http://www.omdbapi.com/?apikey=${omdb.id}&t=${entry}`)
                .then(({ data }) => {
                    const {Title, Year, imdbRating, Ratings, Country, Language, Plot, Actors} = data
                    console.log(`
                    Title: ${Title}, ${Year}
                    ----------------------------------------
                    IMDB Rating:     ${imdbRating}
                    Rotten Tomatoes: ${Ratings[1].Value}
                    ----------------------------------------
                    Origin Country: ${Country}
                    Language(s): ${Language}
                    ----------------------------------------
                    Plot: ${Plot}
                    ----------------------------------------
                    Actors: ${Actors}
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
