const express = require("express");
// const database = require("./database.js");
const cors = require("cors");
const path = require("path");
// const api = require("./router/api");
const website = require("./router/website");
const hbs = require("hbs");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use("/", website);
// database.connectDB();

app.listen(port, () => {
  console.log(`server live at port ${port}`);
});

