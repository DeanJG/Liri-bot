// activates .env file
require("dotenv").config()
// activates axios npm
const axios = require(`axios`)
// moment npm
const moment = require(`moment`)
// spotify npm
const Spotify = require('node-spotify-api')
// activates the keys stored in keys.js
let keys = require("./keys.js")
// activates the various api keys
let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})
let omdb = keys.omdb
let bands = keys.bands
// pulling command line input
let [, , action, entry] = process.argv

function movieFilter (entry) {
    if (!(entry)) {
        return `mr+nobody`
    } else if (entry.indexOf(' ') >= 0) {
        let newEntry = entry.split(` `).join(`+`)
        return newEntry
    } else {return entry}
}
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
            spotify.search({ type: 'track', query: `${entry}` }, function (e, data) {
                if (e) {
                    return console.log('Error occurred: ' + e)
                } else {
                    const { album, artists, name:songTitle, preview_url } = data.tracks.items[0]
                    console.log(`
                    Album Name: ${album.name}
                    ----------------------------------------
                    Group/Artist(s): ${artists[0].name}
                    ----------------------------------------
                    Song: ${songTitle}
                    ----------------------------------------
                    Spotify Preview: ${preview_url}
                    `)
                }
            })
        break;
        case 'movie-this':
            // axios request for omdb
            axios.get(`http://www.omdbapi.com/?apikey=${omdb.id}&t=${movieFilter(entry)}`)
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
