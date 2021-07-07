"use strict";
const axios = require("axios");
const movesFile = {};

class Moves {
  constructor(mData) {
    this.title = mData.title;
    this.vote_average = mData.vote_average;
    this.poster_path = `https://image.tmdb.org/t/p/w500${mData.poster_path}`;
    this.overview = mData.overview;
  }
}

movesFile.getHandelMove = function (req, res) {
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
      console.log(mov);
      res.send(mov);
    })
    .catch((error) => {
      res.status(500).send("error ... from backend req to API moves");
    });
};

module.exports = movesFile;
