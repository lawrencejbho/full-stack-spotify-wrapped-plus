import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";

import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";

import ArtistDropdown from "./ArtistDropdown";

export default function ArtistEntry({
  albumUrl,
  name,
  genres,
  index,
  artistChange,
  id,
  changeId,
  topTracks,
  chooseTrack,
}) {
  function displayIcon() {
    if (artistChange == "lower") {
      return <TiArrowSortedDown className="text-red-600" />;
    } else if (artistChange == "higher") {
      return <TiArrowSortedUp className="text-green-500" />;
    } else if (artistChange == "same") {
      return <div className="h-4"></div>;
    } else if (artistChange == "new") {
      return <GoPrimitiveDot className="text-blue-500" />;
    }
  }

  function styles() {
    if (topTracks?.length > 0) {
      return {
        backgroundColor: "#e2e8f0",
      };
    }
  }

  return (
    <div>
      <div
        className="w-screen flex pl-2 sm:pl-4 py-2 space-x-2 sm:space-x-6 hover:bg-gray-100"
        key={index}
        onClick={() => changeId(id)}
        style={styles()}
      >
        <div className="flex flex-col justify-center items-center min-w-[20px]">
          {index}
          {displayIcon()}
        </div>
        <img
          src={albumUrl}
          className="rounded-md w-[50px] h-[64px] object-cover"
        />
        <div className="justify-start items-start w-full flex-wrap">
          <div className="font-bold items-start justify-start text-start">
            {name}
          </div>
          <div className="overflow-x-hidden flex-wrap font-light text-sm justify-start text-start text-gray-500">
            {genres}
          </div>
        </div>
      </div>
      {topTracks?.length > 0
        ? topTracks.map((entry, index) => {
            return (
              <ArtistDropdown
                chooseTrack={chooseTrack}
                name={entry.name}
                artist={entry.artist}
                uri={entry.uri}
                album={entry.albumUrl}
                index={index + 1}
              />
            );
          })
        : null}
    </div>
  );
}
