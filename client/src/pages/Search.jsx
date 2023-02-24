import React, { useState, useEffect } from "react";
import TrackSearchResults from "../components/TrackSearchResults.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [playingTrack, setPlayingTrack] = useState(false);
  const location = useOutletContext();

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!location.accessToken) return;

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
  }, [search, location.accessToken]);

  function clearSearch(track) {
    if (track) {
      setSearch("");
      setPlayingTrack(track);
    }
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/api/lyrics", {
        params: {
          track: playingTrack.title,
          artists: playingTrack.artists,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  return (
    <>
      <div className=" flex justify-center">
        <form className="w-1/2">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>

          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full p-4 pl-10 text-sm text-gray-900 border-2 border-opacity-50 border-gray-300 rounded-lg  bg-gray-50  focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500"
            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResults
              track={track}
              key={track.uri}
              chooseTrack={location.chooseTrack}
              clearSearch={clearSearch}
            />
          ))}
          {searchResults.length === 0 && (
            <div className="" style={{ whiteSpace: "pre" }}>
              {lyrics}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
