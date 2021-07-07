"use strict";
const axios = require("axios");

const weatherFile = {};

class Weather {
  constructor(wData) {
    // this.wData = wData;
    this.description = wData.weather.description;
    this.date = wData.valid_date;
    this.wind_spd = wData.wind_spd;
  }
}

weatherFile.getHandelWeather = function (req, res) {
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
};

module.exports = weatherFile;
