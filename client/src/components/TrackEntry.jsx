import React from "react";

export default function Top({ name, artist, albumUrl, chooseTrack, track }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div onClick={handlePlay}>
      <div>{artist}</div>
      <div>{name}</div>
      <img src={albumUrl} style={{ height: "64px", width: "64px" }} />
    </div>
  );
}
