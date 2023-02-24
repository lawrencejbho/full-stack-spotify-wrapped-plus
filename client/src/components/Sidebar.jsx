import React from "react";

export default function Sidebar({ choosePage }) {
  return (
    <div className=" flex justify-center cursor-pointer space-x-4">
      <div onClick={() => choosePage("artists")}>Top Artists</div>
      <div onClick={() => choosePage("tracks")}>Top Tracks</div>
      <div onClick={() => choosePage("search")}>Search</div>
    </div>
  );
}
