import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

import TimeSelectNav from "../components/TimeSelectNav.jsx";
import ArtistEntry from "../components/ArtistEntry.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function TopArtist({ accessToken, title }) {
  const location = useOutletContext();
  const [topArtists, setTopArtists] = useState({});
  const [timeSelect, setTimeSelect] = useState("short_term");

  const [artistsChange, setArtistsChange] = useState([]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  useEffect(() => {
    if (!location.accessToken) return;

    axios
      .get("/api/artists-rank-change", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        if (data.status == 204) {
          return;
        } else {
          // console.log(data);
          setArtistsChange(data.data);
        }
      });

    axios
      .get("/api/artists", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        setTopArtists(data.data[0]);
      });
  }, [location.userId, timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className="overflow-x-hidden">
      {topArtists?.artists?.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}

      {topArtists?.artists?.length > 0 ? (
        <div className="mt-12" style={{ whiteSpace: "pre" }}>
          {topArtists.artists.map((artist, index) => {
            return (
              <ArtistEntry
                albumUrl={topArtists.albums[index]}
                name={artist}
                genres={topArtists.genres[index]}
                artistChange={artistsChange[index]}
                index={index + 1}
                key={index}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
