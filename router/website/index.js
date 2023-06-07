const express = require("express");
const database = require("../../database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  let search = req.query.search;
  if (search == undefined) {
    let data = await database.getRandom();
    let img = data.map((x) => x.img);
    let title = data.map((x) => x.title);
    let id = data.map((x) => x._id);
    res.render("index", {
      img: img,
      title: title,
      id: id,
    });
  } else {
    search = decodeURIComponent(req.query.search);
    let data = await database.query(search, 20);
    let img = data.map((x) => x.img);
    let title = data.map((x) => x.title);
    let id = data.map((x) => x._id);
    res.render("searchResults", {
      img: img,
      title: title,
      id: id,
      search: search,
    });
  }
});

router.get("/movie/:id", async (req, res) => {
  let id = req.params.id;

  let data = await database.movieById(id);
  res.render("moviePage", {
    img: data.img,
    title: data.title,
    id: data._id,
    teaser: data.teaser,
    genre: data.genre,
    links: data.links,
  });
});

module.exports = router;
