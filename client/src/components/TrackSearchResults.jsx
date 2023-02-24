import React from "react";

export default function TrackSearchResults({
  track,
  chooseTrack,
  clearSearch,
}) {
  // update the track in Dashboard and clear search results in Search
  function handlePlay() {
    chooseTrack(track);
    clearSearch({ artists: track.artists, title: track.title });
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artists}</div>
      </div>
    </div>
  );
}