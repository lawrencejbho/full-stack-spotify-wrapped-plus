require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require("lyrics-finder");

const app = express();
const pool = require("./db.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/refresh", (req, res) => {
  // console.log(req);
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
  // console.log(req);
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
  // console.log(req);
  const lyrics =
    (await lyricsFinder(req.query.artists, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

app.get("/api/test", (req, res) => {
  res.send("complete");
});

app.get("/api/artists", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM artists");
    res.json(query.rows[query.rows.length - 1].artists);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/api/tracks", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM tracks");
    res.json(query.rows[query.rows.length - 1].artists);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/api/genres", async (req, res) => {
  const { userId, duration } = req.query;

  try {
    const query = await pool.query(
      "SELECT * FROM genres WHERE user_id = $1 AND duration = $2",
      [userId, duration]
    );
    res.json(query.rows[query.rows.length - 1].genres);
  } catch (err) {
    console.log(err.message);
  }
});

// add new artists entries for month
app.post("/api/artists", async (req, res) => {
  const { artists, genres, duration, userId } = req.body.params;
  let topGenres = [];

  // check if the entry already exists for the specific duration
  try {
    const query = await pool.query(
      "SELECT * FROM artists WHERE user_id = $1 AND duration = $2",
      [userId, duration]
    );
    if (query.rows.length > 0) {
      res.sendStatus(200);
      return;
    }
  } catch (err) {
    console.log(err.message);
  }

  // insert into artists table
  try {
    const query = await pool.query(
      "INSERT INTO artists(artists, genres, user_id, duration) VALUES ($1, $2, $3, $4) RETURNING *",
      [artists, genres, userId, duration]
    );
    topGenres = sortTopGenres(query.rows[0].genres);
  } catch (err) {
    console.log(err.message);
  }

  // insert into genres table
  try {
    const saveToDatabase = await pool.query(
      "INSERT INTO genres(genres, user_id, duration) VALUES ($1, $2, $3) RETURNING *",
      [topGenres, userId, duration]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
});

function sortTopGenres(genres_array) {
  // count occurrences of each genres using a map
  let counts = {};

  for (const entry of genres_array) {
    let new_entry = entry.split(", ");
    new_entry.forEach((entry) => {
      if (entry == "") {
        return;
      }
      counts[entry] = counts[entry] ? counts[entry] + 1 : 1;
    });
  }

  // console.log(counts);
  // sort the object into an array from smallest to largest
  const genresSorted = Object.keys(counts).sort(
    (a, b) => counts[a] - counts[b]
  );

  // get the top 10 and reverse the order

  const topTen = genresSorted
    .slice(genresSorted.length - 10, genresSorted.length)
    .reverse();

  return topTen;
}

app.listen(process.env.PORT || 3001);
