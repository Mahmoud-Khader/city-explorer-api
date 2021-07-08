'use strict'


const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const axios = require('axios')
module.exports = moviesHandler;

let inMemory = [];
function moviesHandler(req, res) {
    let searchQuery = req.query.searchQuery
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`
    if (inMemory[searchQuery] !== undefined) {
        console.log('Data from our memory')
        res.send(inMemory[searchQuery]);
    } else {


        axios.get(movieUrl).then(Response => {
            console.log('Data from API server');

            inMemory[searchQuery] = Response.data.results;

            let movieArr = Response.data.results.map(item => {
                return (new Movie(item.title, item.poster_path, item.original_language, item.vote_average, item.overview, item.vote_count, item.popularity, item.release_date)
                )
            })
            res.status(200).send(movieArr)
        }).catch(error => {
            res.status(500).send(error)
        })
    }
    
}

class Movie {
    constructor(title, poster_path, original_language, vote_average, overview, vote_count, popularity, release_date) {

        this.title = title;

        this.poster_path = poster_path;

        this.original_language = original_language;

        this.vote_average = vote_average;

        this.overview = overview;

        this.vote_count = vote_count;

        this.popularity = popularity;

        this.release_date = release_date;
    }
}