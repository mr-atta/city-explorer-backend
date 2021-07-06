"use strict";

// create a variable to use express library
const express = require("express"); // npm i express
require("dotenv").config(); // npm i dotenv
const axios = require("axios");

// CORS: Cross Origin Resource Sharing
// to give the permission for who can send me request
const cors = require("cors"); // npm i cors

const weatherData = require("./assets/weather.json");

// Query parameters:
// lat: Latitude of the city searched
// lon: Longitude of the city searched
// searchQuery: City Name searched

// server has all of the properities and method of express
const server = express();
const PORT = process.env.PORT;
server.use(cors()); // make it open to any client

//// //////////////////////////////////////////////////////////////

class Weather {
  constructor(wData) {
    // this.wData = wData;
    this.description = wData.weather.description;
    this.date = wData.valid_date;
    this.wind_spd = wData.wind_spd;
  }
}

class Moves {
  constructor(mData) {
    this.title = mData.title;
    this.vote_average = mData.vote_average;
  }
}

// localhost:3010/test
server.get("/test", (request, response) => {
  response.status(200).send("my server is working");
});

//localhost:3010/getweatherInfo?searchQuery=<amman>
//      let url2 = `http://localhost:3010/getweatherInfo?searchQuery=${this.state.nameFromInput}&&let=${this.state.dataForCity.lat}&&lon=${this.state.dataForCity.lon}`;

//

// server.get("/getweatherInfo", (req, res) => {
//   // console.log(req.query);
//   let selectedCity = weatherData.find((city) => {
//     if (city.city_name == req.query.searchQuery) {
//       return city;
//     }
//   });
//   let des = selectedCity.data.map((newData) => {
//     return new Weather(newData.weather.description, newData.valid_date);
//   });

//   res.status(200).send(des);
//   console.log(des);
// });

//

// weather
//localhost:3010/getweatherInfo?searchQuery=<amman>&&let=<>&&lon=<>
server.get("/getweatherInfo", getHandelWeather);

// function

function getHandelWeather(req, res) {
  let searchQuery = req.query.searchQuery;

  // https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=e17ed097653a4865b6e6c782cc77c8ac

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_KEY}`;

  axios
    .get(url)
    .then((weatherOfData) => {
      // console.log(weatherOfData);

      let des = weatherOfData.data.data.map((newData) => {
        return new Weather(newData);
      });

      // console.log(weatherOfData.data.data);
      res.send(des);
    })
    .catch((error) => {
      res.status(500).send("error ... from backend req to API weather");
    });
}

// moves
//localhost:3010/getHandelMoveInfo?searchQuery=<amman>
server.get("/getHandelMoveInfo", getHandelMove);

function getHandelMove(req, res) {
  let searchQuery = req.query.searchQuery;
  // https://api.themoviedb.org/3/search/movie?api_key=fae5c20d4567826cc3af88cd810b6916&query=Amman
  let url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVES_KEY}&query=${searchQuery}`;

  axios
    .get(url2)
    .then((MovesOfData) => {
      // .data or .data.data
      let mov = MovesOfData.data.results.map((newData) => {
        return new Moves(newData);
      });
      //
      // console.log(MovesOfData.data.results);
      res.send(mov);
    })
    .catch((error) => {
      res.status(500).send("error ... from backend req to API moves");
    });
}

//

// handle any route
// localhost:3010/ANY_ROUTE
server.get("*", (req, res) => {
  res.status(404).send("NOT FOUND");
});
//

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
