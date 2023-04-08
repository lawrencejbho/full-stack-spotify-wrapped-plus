import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

import TrackEntry from "../components/TrackEntry.jsx";
import TimeSelectNav from "../components/TimeSelectNav.jsx";

import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function TopTrack({ accessToken, title }) {
  const location = useOutletContext();
  const [topTracks, setTopTracks] = useState([]);
  const [timeSelect, setTimeSelect] = useState("short_term");

  const [tracksChange, setTracksChange] = useState([]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  // need to update the scope to get top
  useEffect(() => {
    if (!location.accessToken) return;

    axios
      .get("/api/tracks-rank-change", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        if (data.status == 204) {
          return;
        } else {
          console.log(data);
          setTracksChange(data.data);
        }
      });

    spotifyApi.getMyTopTracks({ time_range: timeSelect }).then((data) => {
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
  }, [location.accessToken, timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div>
      {topTracks.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}
      {topTracks.length > 0 ? (
        <div className="mt-12 text-center" style={{ whiteSpace: "pre" }}>
          {topTracks.map((track, index) => {
            return (
              <TrackEntry
                track={track}
                name={track.name}
                artist={track.artist}
                albumUrl={track.albumUrl}
                chooseTrack={location.chooseTrack}
                key={index}
                index={index + 1}
                tracksChange={tracksChange[index]}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
