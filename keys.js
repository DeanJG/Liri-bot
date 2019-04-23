console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    id: process.env.OMDB_ID
}

exports.bands = {
    id: process.env.BANDS_ID
}

// bandsintown request url
// https://rest.bandsintown.com/artists/the%20killers?app_id=codingbootcamp

// omdb request url
// http://www.omdbapi.com/?apikey=trilogy&