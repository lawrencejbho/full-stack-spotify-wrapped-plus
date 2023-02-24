import React, { useState, useEffect } from "react";
import TopEntry from "../components/TopEntry.jsx";

export default function TopTrack({ accessToken }) {
  // need to update the scope to get top
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyTopTracks({ time_range: "short_term" }).then((data) => {
      // console.log(data.body.items);
      setTopTracks(
        data.body.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          let artists_string = "";
          track.artists.forEach((artist, index) => {
            if (index + 1 == track.artists.length) {
              return (artists_string += `${artist.name}`);
            } else {
              return (artists_string += `${artist.name}, `);
            }
          });

          return {
            artist: artists_string,
            name: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <div>
      {topTracks.length > 0 ? (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {topTracks.map((track) => {
            return (
              <TopEntry
                track={track}
                name={track.name}
                artist={track.artist}
                albumUrl={track.albumUrl}
                chooseTrack={chooseTrack}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
