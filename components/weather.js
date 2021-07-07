'use strict'

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const axios = require('axios')
module.exports = weatherHandler;

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