import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

import TimeSelectNav from "../components/TimeSelectNav.jsx";
import GenreEntry from "../components/GenreEntry";

import GenresChart from "../components/GenresChart.jsx";

import GenresBarChart from "../components/GenresBarChart.jsx";

export default function TopTrack({ accessToken, title }) {
  const [topGenres, setTopGenres] = useState([]);
  const [timeSelect, setTimeSelect] = useState("short_term");
  const location = useOutletContext();

  // need to update the scope to get top
  useEffect(() => {
    axios
      .get("/api/genres", {
        params: { userId: location.userId, duration: timeSelect },
      })
      .then((res) => {
        const data = res.data.map((entry) => {
          return JSON.parse(entry);
        });
        setTopGenres(data);
      });
  }, [timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div className="overflow-x-hidden">
      {topGenres.length > 0 ? (
        <GenresChart data={topGenres.slice(0, 5)} />
      ) : null}

      {topGenres.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}

      {topGenres.length > 0 ? <GenresBarChart data={topGenres} /> : null}
    </div>
  );
}
