import React from "react";

import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";

export default function Top({
  name,
  artist,
  albumUrl,
  chooseTrack,
  track,
  index,
  tracksChange,
}) {
  function handlePlay() {
    chooseTrack(track);
  }

  function displayIcon() {
    if (tracksChange == "lower") {
      return <TiArrowSortedDown className="text-red-600" />;
    } else if (tracksChange == "higher") {
      return <TiArrowSortedUp className="text-green-500" />;
    } else if (tracksChange == "same") {
      return <div className="h-4"></div>;
    } else if (tracksChange == "new") {
      return <GoPrimitiveDot className="text-blue-500" />;
    }
  }

  return (
    <div
      onClick={handlePlay}
      className="flex pl-2 sm:pl-4 py-2 space-x-2 sm:space-x-6  hover:bg-gray-100"
      key={index}
    >
      <div className="flex flex-col justify-center items-center min-w-[20px]">
        {index}
        {displayIcon()}
      </div>
      <img
        src={albumUrl}
        className="rounded-md w-[50px] h-[64px] object-cover"
      />
      <div className="justify-start items-start">
        <div className="font-bold items-start justify-start text-start">
          {name}
        </div>
        <div className="font-light text-sm justify-start text-start text-gray-500">
          {artist}
        </div>
      </div>
    </div>
  );
}
