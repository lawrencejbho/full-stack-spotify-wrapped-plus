require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require("lyrics-finder");

const apiRoutes = require("./routes/api-routes.js");

const app = express();
const pool = require("./db.js");

app.disable("etag");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("/api/test", (req, res) => {
  res.send("complete");
});

app.listen(process.env.PORT || 3001);
