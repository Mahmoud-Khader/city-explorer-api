'use strict';


const express = require('express'); 
require('dotenv').config(); 


const cors = require('cors'); 
const weather = require('./data/weather.json')




const server = express();
const PORT = process.env.PORT ;
server.use(cors()); 



server.get('/',(req,res)=>{
    res.status(200).send('home route')
})

server.get('/weather',(req,res)=>{
    let lat = req.query.lat
    let lon =req.query.lon
    let searchQuery=req.query.searchQuery
    
    console.log(lat);
console.log(lon);
console.log(searchQuery);

try{
    let findData=()=>{
   
     let city =weather.find((city,idx)=>{
       return city.city_name.toLowerCase()===searchQuery.toLowerCase() && city.lat===Number(lat) && city.lon==Number(lon)})
   
    return city.data.map(item=>{
      return new ForeCast(item)
    })}
   
    res.json( findData())
      
   }catch(err){
   
   res.status(500)
   res.send('Error :something went wrong !!')
   
   }
   
    });

    class ForeCast{
        constructor(weatherInfo){
            this.date=weatherInfo.vaild_date;
            this.description=weatherInfo.weather.description
        }
    }
   
// localhost:3001/ANY_ROUTE
server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})