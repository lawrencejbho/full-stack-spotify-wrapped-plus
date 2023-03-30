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
      // use this to test loading spinner
      // setTimeout(() => {
      //   res.json({
      //     accessToken: data.body.access_token,
      //     refreshToken: data.body.refresh_token,
      //     expiresIn: data.body.expires_in_in,
      //   });
      // }, 2000);
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

//test
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

app.post("/api/recent-tracks", async (req, res) => {
  const { recent_tracks, userId } = req.body.params;
  let update_array = [];

  try {
    // check if we have an entry for today already
    // const query = await pool.query(
    //   "SELECT * FROM recent_tracks WHERE user_id = $1",
    //   [userId]
    // );

    const query = await pool.query(
      "SELECT * FROM recent_tracks ORDER BY created_at DESC LIMIT 1"
    );

    console.log(query.rows[0]);
    console.log(query.rows.length);
    if (query.rows.length == 0) {
      console.log("hit");
      let currentDate = new Date().toISOString().split("T")[0];

      for (let i = recent_tracks.length - 1; i > -1; i--) {
        if (recent_tracks[i].date.slice(0, 10) == currentDate) {
          console.log(i);
          update_array.push(recent_tracks[i]);
        }
      }
      return;
    }

    // it comes back as a string so use JSON parse to put it back as an object
    // add any entries newer than our last entry into the update array
    console.log(query.rows[0].created_at);
    const length = query.rows[0].tracks.length;
    console.log("length" + length);
    const latest = JSON.parse(
      query.rows[query.rows.length - 1].tracks[length - 1]
    );

    console.log("latest" + latest.date);
    let currentDate = latest.date.slice(0, 10);
    let currentTimestamp = convertToTimestamp(latest.date);

    for (let i = recent_tracks.length - 1; i > -1; i--) {
      if (recent_tracks[i].date.slice(0, 10) == currentDate) {
        if (convertToTimestamp(recent_tracks[i].date) > currentTimestamp) {
          console.log("first" + convertToTimestamp(recent_tracks[i].date));
          console.log("second" + currentTimestamp);
          console.log(recent_tracks[i]);
          update_array.push(recent_tracks[i]);
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log(update_array.length);
    // create a new entry or update the existing one
    if (update_array.length > 0) {
      const query = await pool.query(
        "INSERT INTO recent_tracks(tracks,user_id) VALUES ($1, $2) RETURNING *",
        [update_array, userId]
      );
      res.sendStatus(200);
    }
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

function convertToTimestamp(str) {
  const timestamp = new Date(str).getTime();
  return Math.floor(timestamp / 1000);
}

function getCurrentTimestamp() {
  const timestamp = new Date().getTime();
  return Math.floor(timestamp / 1000);
}

app.get("/api/time-listened", async (req, res) => {
  const { userId } = req.query;
  console.log(userId);

  try {
    // check if we have an entry for today already
    // const query = await pool.query(
    //   "SELECT tracks FROM recent_tracks WHERE user_id = $1",
    //   [userId]
    // );
    const query = await pool.query(
      "SELECT tracks FROM recent_tracks WHERE user_id = $1",
      [userId]
    );
    console.log(query.rows[0].tracks);
    const trackArray = query.rows[0].tracks;
    console.log(trackArray);

    let total = 0;
    trackArray.forEach((track) => {
      let object = JSON.parse(track);
      total += object.duration;
    });
    res.json({ duration: total });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(process.env.PORT || 3001);
