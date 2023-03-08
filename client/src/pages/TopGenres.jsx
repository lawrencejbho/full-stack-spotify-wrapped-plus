import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

import TimeSelectNav from "../components/TimeSelectNav.jsx";
import GenreEntry from "../components/GenreEntry";

export default function TopTrack({ accessToken }) {
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
        setTopGenres(res.data);
      });
  }, [timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  return (
    <div>
      {topGenres.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}
      {topGenres.length > 0 ? (
        <div className="mt-12 text-center" style={{ whiteSpace: "pre" }}>
          {topGenres.map((track, index) => {
            return <GenreEntry genre={track} key={index} index={index + 1} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
