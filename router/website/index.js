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
    let data = await database.query(search, 30);
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
  
  let watch = {}
  for (const key in data.links.magnets) {
    if (data.links.magnets.hasOwnProperty(key)) {
      const trimmedKey = key.trim().split(' ')[0];
      watch[trimmedKey] = data._id;
    }
  }

  res.render("moviePage", {
    img: data.img,
    title: data.title,
    id: data._id,
    teaser: data.teaser,
    genre: data.genre,
    magnets: data.links.magnets,
    torrents: data.links.torrents,
    watch: watch
  });
});


router.get('/movie/watch/:id', async(req, res)=>{
  let data = await database.movieById(req.params.id)
  if(req.query.q != undefined){
    let q = req.query.q + ' Magnet'
    let links = data.links.magnets 
    streamLink = links[q]
  }
  else{
    let links = data.links.magnets 
    streamLink = Object.values(links)[0]
  }
  res.render('streamPage', {
    link : streamLink,
    title: data.title
  })
})

module.exports = router;
