import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import TrackSearchResults from "../components/TrackSearchResults.jsx";
import Player from "../components/Player.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import TopEntry from "../components/TopEntry.jsx";
import Sidebar from "../components/Sidebar.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
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
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artists: playingTrack.artists,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false; // if a new request is made then we want to cancel the original request
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <section className="h-screen">
      <Sidebar choosePage={choosePage} />
      <div className="flex-grow h-1/2">content</div>

      <footer className="bottom-0">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </footer>
    </section>
  );
}
