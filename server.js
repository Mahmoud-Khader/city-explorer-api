'use strict';


const express = require('express');
require('dotenv').config();


const cors = require('cors');
const axios = require('axios')
// const weatherData = require('./data/weather.json');




const server = express();
const PORT = process.env.PORT;
server.use(cors());
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const MOVIE_API_KEY = process.env.MOVIE_API_KEY



server.get('/', homeRoute)
server.get('/weather', weatherHandler)
server.get('/movies', moviesHandler)

function homeRoute(req, res) {
    res.status(200).send('home route')
}


//-------------------------------------------movie function----------------------------------------

//http://localhost:3001/movies?searchQuery=amman

function moviesHandler(req, res) {
    let searchQuery = req.query.searchQuery
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`
    axios.get(movieUrl).then(Response => {
        let movieArr = Response.data.results.map(item => {
            return (new Movie(item.title, item.poster_path, item.original_language, item.vote_average, item.overview, item.vote_count, item.popularity, item.release_date)
            )
        })
        res.status(200).send(movieArr)
    }).catch(error => {
        res.status(500).send(error)
    })
}


//---------------------------------------------Weather function------------------------------------

//http://localhost:3001/weather?searchQuery=amman&lon=35.91&lat=31.95
function weatherHandler(req, res) {

    let lat = req.query.lat
    let lon = req.query.lon
    let searchQuery = req.query.searchQuery

    let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    //  let weatherUrl=`http://api.weatherbit.io/v2.0/forecast/daily?city=amman}&lat=31.9515694&lon=35.9239625&key=${process.env.WEATHER_API_KEY}`

    axios.get(weatherUrl).then(Response => {

        let findData = Response.data.data.map(item => {
            return (new ForeCast(item.valid_date, item.weather.description))
        })
        res.status(200).send(findData)
    }).catch(error => {
        res.status(404).send(error)
    })
}


class ForeCast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
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


// localhost:3001/ANY_ROUTE
server.get('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})