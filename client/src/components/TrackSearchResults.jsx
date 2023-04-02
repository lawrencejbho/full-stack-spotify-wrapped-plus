import React from "react";

export default function TrackSearchResults({
  track,
  chooseTrack,
  clearSearch,
  index,
}) {
  // update the track in Dashboard and clear search results in Search
  function handlePlay() {
    chooseTrack(track);
    clearSearch({ artists: track.artists, title: track.title });
  }

  return (
    <div
      className=" flex pl-2 sm:pl-4 py-2 space-x-2 sm:space-x-6 hover:bg-gray-100 cursor-pointer w-full"
      key={index}
      onClick={handlePlay}
    >
      <div className="flex justify-center items-center min-w-[20px]">
        {index}
      </div>
      <img
        src={track.albumUrl}
        className="rounded-md w-[50px] h-[64px] object-cover"
      />{" "}
      <div className="ml-3">
        <div className="font-bold items-start justify-start text-start">
          {track.title}
        </div>
        <div className="text-muted">{track.artists}</div>
      </div>
    </div>
  );
}
