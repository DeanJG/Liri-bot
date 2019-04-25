// activates .env file
require("dotenv").config()
// activates axios npm
const axios = require(`axios`)
// moment npm
const moment = require(`moment`)
// spotify npm
const Spotify = require('node-spotify-api')
// fs npm
const fs = require(`fs`)
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
// filters the movie entry for spaces or blank entry
function movieFilter (entry) {
    if (!(entry)) {
        return `mr+nobody`
    } else if (entry.indexOf(' ') >= 0) {
        let newEntry = entry.split(` `).join(`+`)
        return newEntry
    } else {return entry}
}
// filters song choice for blank entry
function songFilter (entry) {
    if (!(entry)) {
        return `fresh prince`
    } else {return entry}
}
// main app function, switching depending on which type of command is given
const switchFunc = (action, entry) => {
    switch (action) {
        case 'concert-this':
        // bands in town request
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
        // spotify request
            spotify.search({ type: 'track', query: `${songFilter(entry)}` }, function (e, data) {
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
                    Spotify Preview(if available):
                    -> ${preview_url}
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
                    Origin Country(ies): ${Country}
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
        default:
        break
    }
}
// container if statement //
// checks if request to run is writtin in-line or in txt file //
if (action === `do-what-it-says`) {
    fs.readFile(`random.txt`, `utf8`, (e, data) => {
        if (e) {
            console.log(e)
        } else {
            let dataArr = data.split(`,`)
            let [action, entry] = dataArr
            switchFunc(action, entry)
        }
    })

} else {switchFunc(action, entry)}