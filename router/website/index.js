const express = require("express");
const api = require("../../api/movie.js");
const router = express.Router();

router.get("/", async (req, res) => {
  let search = req.query.search;
  if (search == undefined) {
    let data = await api.getPopularMovies();
    let img = data.map((x) => x.medium_cover_image);
    let title = data.map((x) => x.title_long);
    let id = data.map((x) => x.id);
    let IMDB = data.map((x) => x.rating);
    res.render("index", {
      img: img,
      title: title,
      IMDB: IMDB,
      id: id,
    });
  } else {
    search = req.query.search;
    let data = await api.query(search);
    if (typeof data === "object" && !Array.isArray(data) && data !== null)
      data = [];

    let img = data.map((x) => x.medium_cover_image);
    let title = data.map((x) => x.title_long);
    let id = data.map((x) => x.id);
    let IMDB = data.map((x) => x.rating);
    res.render("searchResults", {
      img: img,
      title: title,
      id: id,
      IMDB: IMDB,
      search: search,
    });
  }
});

router.get("/movie/:id", async (req, res) => {
  let id = req.params.id;

  let data = await database.movieById(id);

  let watch = {};
  for (const key in data.links.magnets) {
    if (data.links.magnets.hasOwnProperty(key)) {
      const trimmedKey = key.trim().split(" ")[0];
      watch[trimmedKey] = data._id;
    }
  }

  res.render("moviePage", {
    img: data.img,
    title: data.title,
    id: data._id,
    IMDB: data.IMDB_rating,
    teaser: data.teaser,
    genre: data.genre,
    magnets: data.links.magnets,
    torrents: data.links.torrents,
    watch: watch,
  });
});

router.get("/movie/watch/:id", async (req, res) => {
  let data = await database.movieById(req.params.id);
  if (req.query.q != undefined) {
    let q = req.query.q + " Magnet";
    let links = data.links.magnets;
    streamLink = links[q];
  } else {
    let links = data.links.magnets;
    streamLink = Object.values(links)[0];
  }
  res.render("streamPage", {
    link: streamLink,
    title: data.title,
  });
});

module.exports = router;
