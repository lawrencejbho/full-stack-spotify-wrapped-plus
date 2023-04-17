import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";

import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";

import TopTrackDropdown from "./TopTrackDropdown";
import RelatedArtistsDropdown from "./RelatedArtistsDropdown";

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
  relatedArtists,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [displayRelatedArtists, setDisplayRelatedArtists] = useState(false);

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
    if (isClicked) {
      return {
        backgroundColor: "#ffffff",
      };
    }
    if (topTracks?.length > 0) {
      return {
        backgroundColor: "#e2e8f0",
      };
    }
  }

  const handleClick = () => {
    console.log("hit");
    if (!dropdownOpen) {
      changeId(id);
      setDropdownOpen(true);
    } else {
      changeId(id);
      setDisplayRelatedArtists(false);
      setDropdownOpen(false);
    }

    setTimeout(() => {
      setIsClicked(true);
    }, 50);
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };

  function clickDisplayRelatedArtists(event) {
    event.stopPropagation();

    if (dropdownOpen) {
      console.log(displayRelatedArtists);
      if (displayRelatedArtists) {
        changeId(id);
        setDropdownOpen(false);
        setDisplayRelatedArtists(false);
      } else {
        console.log("hitt");
        setDisplayRelatedArtists(true);
      }
    } else {
      setDropdownOpen(true);
      changeId(id);
      setDisplayRelatedArtists(true);
    }
  }

  function clickDisplayTopTracks(event) {
    event.stopPropagation();

    if (dropdownOpen) {
      console.log(displayRelatedArtists);
      if (!displayRelatedArtists) {
        changeId(id);
        setDropdownOpen(false);
        setDisplayRelatedArtists(false);
      } else {
        setDisplayRelatedArtists(false);
      }
    } else {
      setDropdownOpen(true);
      changeId(id);
      setDisplayRelatedArtists(false);
    }
  }

  function dropdown() {
    if (displayRelatedArtists && relatedArtists?.length > 0) {
      return relatedArtists.map((entry, index) => {
        return (
          <RelatedArtistsDropdown
            name={entry.name}
            genres={entry.genres}
            artistImage={entry.artistImage}
            index={index + 1}
          />
        );
      });
    }

    if (!displayRelatedArtists && topTracks?.length > 0) {
      return topTracks.map((entry, index) => {
        return (
          <TopTrackDropdown
            chooseTrack={chooseTrack}
            name={entry.name}
            artist={entry.artist}
            uri={entry.uri}
            album={entry.albumUrl}
            index={index + 1}
          />
        );
      });
    }

    return null;
  }

  function tracks() {}

  return (
    <div>
      <div
        className="w-screen flex pl-2 sm:pl-4 py-2 space-x-2 sm:space-x-6 hover:bg-gray-100 cursor-pointer"
        key={index}
        onClick={handleClick}
        style={styles()}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className="flex flex-col justify-center items-center min-w-[20px]">
          {index}
          {displayIcon()}
        </div>

        <img
          src={albumUrl}
          className="rounded-md w-[50px] h-[64px] object-cover"
        />

        <div className="justify-start items-start w-1/3 flex-wrap">
          <div className="font-bold items-start justify-start text-start">
            {name}
          </div>
          <div className="overflow-x-hidden flex-wrap font-light text-sm justify-start text-start text-gray-500">
            {genres}
          </div>
        </div>
        {isHovered ? (
          <button
            className="z-10 w-24 bg-slate-400"
            onClick={clickDisplayTopTracks}
          >
            Popular Songs
          </button>
        ) : null}

        {isHovered ? (
          <button
            className="z-10 w-24 bg-slate-400"
            onClick={clickDisplayRelatedArtists}
          >
            Related Artists
          </button>
        ) : null}
      </div>

      {/* {topTracks?.length > 0
        ? topTracks.map((entry, index) => {
            return (
              <TopTrackDropdown
                chooseTrack={chooseTrack}
                name={entry.name}
                artist={entry.artist}
                uri={entry.uri}
                album={entry.albumUrl}
                index={index + 1}
              />
            );
          })
        : null} */}
      {/* {displayRelatedArtists
        ? relatedArtists.map((entry, index) => {
            return (
              <RelatedArtistsDropdown
                name={entry.name}
                genres={entry.genres}
                artistImage={entry.artistImage}
                index={index + 1}
              />
            );
          })
        : null} */}
      {dropdown()}
    </div>
  );
}
