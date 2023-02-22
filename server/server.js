const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
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
    .catch(() => {
      console.log("error");
      res.sendStatus(400);
    });
});
