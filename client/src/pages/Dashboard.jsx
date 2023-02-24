import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import Player from "../components/Player.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import SideBar from "../components/Sidebar.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Dashboard({ code }) {
  const [playingTrack, setPlayingTrack] = useState();
  const [page, setPage] = useState("search");
  const accessToken = useAuth(code);

  // console.log(code);

  function choosePage(page) {
    setPage(page);
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
    // setLyrics("");
  }

  // console.log(accessToken);

  return (
    <section className="h-screen">
      {accessToken ? <SideBar accessToken={accessToken} /> : null}

      <div className="pt-4 flex-grow h-[85%] items-center justify-center">
        <Outlet
          context={{ accessToken: accessToken, chooseTrack: chooseTrack }}
        />
      </div>

      <footer className="sticky bottom-0">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </footer>
    </section>
  );
}
