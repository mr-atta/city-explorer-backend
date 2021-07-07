"use strict";

// create a variable to use express library
const express = require("express"); // npm i express
require("dotenv").config(); // npm i dotenv
const axios = require("axios");

// CORS: Cross Origin Resource Sharing
// to give the permission for who can send me request
const cors = require("cors"); // npm i cors

const weatherData = require("./assets/weather.json");

// server has all of the properities and method of express
const server = express();
const PORT = process.env.PORT;
server.use(cors()); // make it open to any client

//// ////////////////////////////////////////////////////////////////
// weather class
///////////////
// import Weather.js
const weatherFile = require("./modules/weather");

///////////////
const movesFile = require("./modules/movies");

////////////////////////////////////////////////////////////////////

// teast
// localhost:3010/test
server.get("/test", (request, response) => {
  response.status(200).send("my server is working");
});

// weather
//localhost:3010/getweatherInfo?searchQuery=<amman>&&let=<>&&lon=<>
server.get("/getweatherInfo", weatherFile.getHandelWeather);

// function weather

// moves
//localhost:3010/getHandelMoveInfo?searchQuery=<amman>
server.get("/getHandelMoveInfo", movesFile.getHandelMove);

// function moves

// handle any route
// localhost:3010/ANY_ROUTE
server.get("*", (req, res) => {
  res.status(404).send("NOT FOUND");
});
//

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
