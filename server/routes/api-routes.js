const express = require("express");

const apiLoginController = require("../controllers/api-login-controller");

const router = express.Router();

router.post("/refresh", apiLoginController.refreshAccess);

router.post("/login", apiLoginController.loginSpotify);

router.get("/lyrics", apiLoginController.getLyrics);

router.get("/artists", apiLoginController.getArtists);

router.get("/artists", apiLoginController.getArtists);

router.get("/artists-rank-change", apiLoginController.getArtistsRankChange);

router.get("/tracks", apiLoginController.getTracks);

router.get("/genres", apiLoginController.getGenres);

router.get("/listening-history", apiLoginController.getListeningHistory);

router.post("/artists", apiLoginController.addArtists);

router.post("/recent-tracks", apiLoginController.addRecentTracks);

module.exports = router;
