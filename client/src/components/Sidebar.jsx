import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ choosePage }) {
  const location = useLocation();

  const { pathname } = location;
  return (
    <div className=" flex justify-center cursor-pointer space-x-4">
      <div onClick={() => choosePage("artists")}>Top Artists</div>
      <div onClick={() => choosePage("tracks")}>Top Tracks</div>
      <a href="/search">
        {/* <div onClick={() => choosePage("search")}>Search</div> */}
        <div>Search</div>
      </a>
      <Link to="/test">
        {/* <div onClick={() => choosePage("search")}>Search</div> */}
        <div>Test</div>
      </Link>
    </div>
  );
}
