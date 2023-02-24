const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require("lyrics-finder");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/refresh", (req, res) => {
  console.log(req);
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173/dashboard/",
    clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
    clientSecret: "9aa707866a144a66955d05e169c16214",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post("/api/login", (req, res) => {
  console.log(req);
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173/dashboard/",
    clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
    clientSecret: "9aa707866a144a66955d05e169c16214",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in_in,
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

// need url encoded to parse the url params in get request
app.get("/api/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artists, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

app.listen(3001);
