import React from "react";

export default function Search() {
  return (
    <div>
      <form
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResults
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
    </div>
  );
}
