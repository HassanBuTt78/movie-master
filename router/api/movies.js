const express = require("express");
const database = require("../../database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  let search = req.query.search;
  let amount = req.query.amount;
  if (search == undefined) {
    res.send({
      0: "To Fetch Movies Use Query Params",
      search: "Use 'search' Param to search for the movie you are looking for",
      amount: "use 'amount' param to limit the amount of results",
      example: "http://localhost:4000/api/movies?search=fantastic&amount=10",
      genre:
        "You can filter results by specific genre by going to directory '/movies/<genre>' and same params will work",
    });
  } else {
    search = decodeURIComponent(req.query.search);
    let results = database.query(search, amount);
    res.send(await results);
  }
});

router.get("/:genre", async (req, res) => {
  let search = req.query.search;
  let amount = req.query.amount;
  let genre = req.params.genre;
  if (search == undefined) {
    let results = database.moviesByGenre(genre, amount);
    res.send(await results);
  } else {
    search = decodeURIComponent(req.query.search);
    let results = database.genreQuery(search, genre, amount);
    res.send(await results);
  }
});

module.exports = router;
