import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import DashboardContainer from "../components/DashboardContainer";
import TimeSelectNav from "../components/TimeSelectNav";

export default function Dashboard(accessToken, title) {
  const location = useOutletContext();

  const [timeSelect, setTimeSelect] = useState("short_term");
  const [topArtists, setTopArtists] = useState({});
  const [topTracks, setTopTracks] = useState({});
  const [topGenres, setTopGenres] = useState({});

  useEffect(() => {
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
    axios
      .get("/api/genres", {
        params: { userId: location.userId, duration: timeSelect },
      })
      .then((res) => {
        // console.log(res);
        const data = res.data.genres.map((entry) => {
          return JSON.parse(entry);
        });
        setTopGenres(data);
      });
  }, [location.userId, timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);

  console.log(topArtists);

  return (
    <div className="overflow-x-hidden">
      {topGenres.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}
      <div className="mt-4 ml-4">
        <div className="font-bold mb-2">Top Artists</div>
        {topArtists.artists.length > 0
          ? topArtists.artists.slice(0, 5).map((entry) => {
              console.log(entry);
              return <DashboardContainer data={entry} />;
            })
          : null}
      </div>

      <div className="mt-4 ml-4">
        <div className="font-bold mb-2">Top Tracks</div>
        {topTracks.tracks.length > 0
          ? topTracks.tracks.slice(0, 5).map((entry) => {
              return <DashboardContainer data={entry} />;
            })
          : null}
      </div>
      <div className="mt-4 ml-4">
        <div className="font-bold mb-2">Top Genres</div>
        {topGenres.length > 0
          ? topGenres.slice(0, 5).map((entry) => {
              return <DashboardContainer data={entry.genre} />;
            })
          : null}
      </div>
    </div>
  );
}
