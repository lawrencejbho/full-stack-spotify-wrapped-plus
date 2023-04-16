import React from "react";

export default function ArtistDropdown({
  name,
  artist,
  uri,
  album,
  index,
  chooseTrack,
}) {
  function handlePlay() {
    chooseTrack(uri);
  }
  return (
    <div
      onClick={handlePlay}
      className="flex sm:pl-4 py-2 space-x-2 sm:space-x-6 hover:bg-gray-100"
      key={index}
    >
      <div className="pl-16 flex flex-col justify-center items-center min-w-[20px]">
        {index}
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
