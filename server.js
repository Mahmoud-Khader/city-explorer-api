'use strict';


const express = require('express');
require('dotenv').config();


const cors = require('cors');
const axios = require('axios')


const moviesHandler = require('./components/movies')
const weatherHandler = require('./components/weather')


const server = express();
const PORT = process.env.PORT;
server.use(cors());




server.get('/', homeRoute)


//--------------------------------------------weatherFunction-----------------

server.get('/weather', weatherHandler)


//---------------------------------------------moviesFunction------------------------

server.get('/movies', moviesHandler)




function homeRoute(req, res) {
    res.status(200).send('home route')
}






// localhost:3001/ANY_ROUTE
server.get('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})