import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

import TrackEntry from "../components/TrackEntry.jsx";
import TimeSelectNav from "../components/TimeSelectNav.jsx";

import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function TopTrack({ accessToken, title }) {
  const location = useOutletContext();
  const [topTracks, setTopTracks] = useState([]);
  const [timeSelect, setTimeSelect] = useState("short_term");

  const [tracksChange, setTracksChange] = useState([]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  // need to update the scope to get top
  useEffect(() => {
    if (!location.accessToken) return;

    axios
      .get("/api/tracks-rank-change", {
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
          setTracksChange(data.data);
        }
      });

    axios
      .get("/api/tracks", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        // console.log(data.data[0]);
        setTopTracks(data.data[0]);
      });
  }, [location.accessToken, timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div>
      {topTracks?.tracks?.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}
      {topTracks?.tracks?.length > 0 ? (
        <div className="mt-12 text-center" style={{ whiteSpace: "pre" }}>
          {topTracks.tracks.map((track, index) => {
            return (
              <TrackEntry
                track={topTracks.uris[index]}
                name={track}
                artist={topTracks.artists[index]}
                albumUrl={topTracks.albums[index]}
                chooseTrack={location.chooseTrack}
                key={index}
                index={index + 1}
                tracksChange={tracksChange[index]}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
