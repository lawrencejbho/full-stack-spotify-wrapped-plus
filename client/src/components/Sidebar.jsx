import React from "react";
import SidebarItem from "./SidebarItem";

import StarImg from "../assets/star.png";
import HeartImg from "../assets/heart.png";
import SearchImg from "../assets/search.png";
import HeadphoneImg from "../assets/rounded-headphones.png";
import ChartImg from "../assets/arrow-chart.png";
import DashboardImg from "../assets/dashboard.png";

export default function Sidebar({ page, accessToken, handleClick }) {
  return (
    <div className="inline-block ">
      <div className=" flex w-16 h-full sm:w-36 ">
        <aside className="flex w-16 sm:w-36 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2">
          <SidebarItem
            image={DashboardImg}
            handleClick={handleClick}
            pathname="dashboard"
            accessToken={accessToken}
            display="Dashboard"
            page={page}
          />
          <SidebarItem
            image={StarImg}
            handleClick={handleClick}
            pathname="top-artists"
            accessToken={accessToken}
            display="Top Artists"
            page={page}
          />
          <SidebarItem
            image={HeadphoneImg}
            handleClick={handleClick}
            pathname="top-tracks"
            accessToken={accessToken}
            display="Top Tracks"
            page={page}
          />
          <SidebarItem
            image={HeartImg}
            handleClick={handleClick}
            pathname="top-genres"
            display="Top Genres"
            page={page}
          />
          <SidebarItem
            image={SearchImg}
            handleClick={handleClick}
            pathname="search"
            accessToken={accessToken}
            display="Search"
            page={page}
          />
          <SidebarItem
            image={ChartImg}
            handleClick={handleClick}
            pathname="listening-history"
            accessToken={accessToken}
            display="Listening History"
            page={page}
          />
        </aside>
      </div>
    </div>
  );
}
