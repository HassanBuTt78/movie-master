const express = require("express");
const api = require("../../api/movie.js");
const { generateMagnetLink } = require("../../utils/magnetLinks.js");
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
  const id = req.params.id;

  const [movieData, similarMoviesData] = await Promise.all([
    api.movieById(id),
    api.getSimilarMovies(id),
  ]);  if (movieData == undefined) return;

  //making array of magnets and torrents
  const magnetLinks = new Object();
  const torrentLinks = new Object();
  const watch = new Object();
  for (const torrent of movieData.torrents) {
    const magnetLink = generateMagnetLink(torrent.hash, movieData.title);
    magnetLinks[torrent.quality + " Magnet"] = magnetLink;
    watch[torrent.quality] = id;
    torrentLinks[torrent.quality + " Torrent"] = torrent.url;
  }



  let img = similarMoviesData.map((x) => x.medium_cover_image);
  let title = similarMoviesData.map((x) => x.title_long);
  let sugId = similarMoviesData.map((x) => x.id);
  let IMDB = similarMoviesData.map((x) => x.rating);

  res.render("moviePage", {
    _img: movieData.large_cover_image,
    _title: movieData.title_long,
    _id: movieData.id,
    _IMDB: movieData.rating,
    teaser: movieData.description_full,
    genre: movieData.genres,
    torrents: torrentLinks,
    magnets: magnetLinks,
    watch: watch,

    img: img,
    title: title,
    id: sugId,
    IMDB: IMDB,

  });
});

router.get("/movie/watch/:id", async (req, res) => {
  let data = await api.movieById(req.params.id);
  let streamLink;
  let q = req.query.q || "720p";
  for (const torrent of data.torrents) {
    if (torrent.quality == q) {
      streamLink = generateMagnetLink(torrent.hash, data.title);
    }
  }
  res.render("streamPage", {
    link: streamLink,
    title: data.title,
  });
});

module.exports = router;
