import React from "react";
import { NavLink } from "react-router-dom";
import StarImg from "../assets/star.png";
import HeartImg from "../assets/heart.png";
import SearchImg from "../assets/search.png";

export default function Sidebar({ accessToken }) {
  return (
    <>
      <div className="absolute flex h-[85%]">
        <aside className="flex w-36 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2">
          <NavLink
            to={{ pathname: "/top-artists", accessToken: accessToken }}
            className="flex flex-col items-center space-x-1 rounded-md px-2 py-3 opacity-70 hover:opacity-100 hover:bg-gray-100"
          >
            <img src={StarImg} className="w-8" />
            <span>Top Artists</span>
          </NavLink>

          <NavLink
            to={{ pathname: "/top-tracks", accessToken: accessToken }}
            className="flex flex-col items-center space-x-1 rounded-md px-2 py-3 opacity-70 hover:opacity-100 hover:bg-gray-100"
          >
            <img src={HeartImg} className="w-8" />

            <span>Top Tracks</span>
          </NavLink>

          <NavLink
            to={{ pathname: "/search", accessToken: accessToken }}
            className="flex flex-col items-center space-x-1 rounded-md px-2 py-3 opacity-70 hover:opacity-100 hover:bg-gray-100 "
          >
            <img src={SearchImg} className="w-8" />

            <span>Search</span>
          </NavLink>
        </aside>
      </div>
    </>
  );
}
