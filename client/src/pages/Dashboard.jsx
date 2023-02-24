import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import Player from "../components/Player.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import Sidebar from "../components/Sidebar.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Dashboard() {
  const location = useLocation();

  const accessToken = useAuth(location.state);
  const [playingTrack, setPlayingTrack] = useState();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [page, setPage] = useState("search");

  function choosePage(page) {
    setPage(page);
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  console.log(accessToken);
  return (
    <section className="h-screen">
      <div className="flex-grow h-1/2"></div>
      <div>Test</div>

      <footer className="bottom-0">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </footer>
      {/* <Outlet /> */}
    </section>
  );
}
