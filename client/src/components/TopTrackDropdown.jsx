import React, { useState } from "react";

import { BsPlayFill } from "react-icons/bs";

export default function ArtistDropdown({
  name,
  artist,
  uri,
  album,
  index,
  chooseTrack,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handlePlay() {
    chooseTrack(uri);
    setTimeout(() => {
      setIsClicked(true);
    }, 50);
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  }

  function styles() {
    if (isClicked) {
      return {
        backgroundColor: "#ffffff",
      };
    }
  }

  return (
    <div
      onClick={handlePlay}
      className="flex sm:pl-4 py-2 space-x-2 sm:space-x-6 hover:bg-gray-100 cursor-pointer"
      key={index}
      style={styles()}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="pl-16 flex flex-col justify-center items-center min-w-[20px] w-4">
        {isHovered ? <BsPlayFill className="text-xl" /> : index}
      </div>
      <img src={album} className=" rounded-md w-[50px] h-[64px] object-cover" />
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
