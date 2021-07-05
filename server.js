'use strict';

// create a variable to use express library
const express = require('express'); // npm i express
require('dotenv').config(); // npm i dotenv

// CORS: Cross Origin Resource Sharing
// to give the permission for who can send me request 
const cors = require('cors'); // npm i cors

const weatherData = require('./assets/weather.json')


// //////////////////////////////////////////////////////////////
// Query parameters: 
// lat: Latitude of the city searched
// lon: Longitude of the city searched
// searchQuery: City Name searched

// server has all of the properities and method of express
const server = express();
const PORT = process.env.PORT;
server.use(cors()); // make it open to any client

// 

class Weather {
 // that properties of `date` and `description`.
    
//  this.date = 
//  this.description =
 
    constructor(){
   

    }
}


// localhost:3010/test
server.get('/test',(request,response)=>{
    response.status(200).send('my server is working')
})

//localhost:3010/getweatherInfo?lat=<>&&lon=<>&&searchQuery=<amman>
server.get('/getweatherInfo',(req,res)=>{
    console.log(req.query);
    let selectedCity = weatherData.find (city =>{
        if(city.city_name == req.query.searchQuery) {
            return city
        }
    })

     selectedCity.data.map(newData=> {
        return new Weather (newData.weather.description, newData.valid_date)
    })
    console.log(selectedCity);

    res.status(200).send(selectedCity);
})

// handle any route
// localhost:3010/ANY_ROUTE
server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
})
//

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})