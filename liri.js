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
let [, , num1, num2] = process.argv


// axios request for omdb
axios.get(`http://www.omdbapi.com/?apikey=${omdb.id}&t=goodfellas`)
  .then(r => {
    console.log(r);
  })
  .catch(e => {
    console.log(e);
  });