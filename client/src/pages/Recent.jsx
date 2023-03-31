import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import TrackEntry from "../components/TrackEntry.jsx";
import ListeningHistoryChart from "../components/ListeningHistoryChart.jsx";

import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Recent({ accessToken, title }) {
  const location = useOutletContext();
  const [recent, setRecent] = useState([]);
  const [todayDuration, setTodayDuration] = useState(0);
  const [timeListened, setTimeListened] = useState(0);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  useEffect(() => {
    if (!location.accessToken) return;

    axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        params: {
          limit: 50,
          access_token: location.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        setRecent(
          res?.data?.items?.map((item) => {
            const smallestAlbumImage = item.track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              item.track.album.images[0]
            );
            let artists_string = "";
            item.track.artists.forEach((artist, index) => {
              if (index + 1 == item.track.artists.length) {
                return (artists_string += `${artist.name}`);
              } else {
                return (artists_string += `${artist.name}, `);
              }
            });

            return {
              artist: artists_string,
              name: item.track.name,
              uri: item.track.uri,
              albumUrl: smallestAlbumImage.url,
              duration: item.track.duration_ms,
              date: item.played_at,
            };
          })
        );
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [location.accessToken]);

  useEffect(() => {
    if (recent.length < 1) return;
    let recent_array = recent.map((entry) => {
      return {
        duration: entry.duration,
        date: entry.date,
      };
    });
    console.log(recent_array);

    axios.post("/api/recent-tracks", {
      params: {
        recent_tracks: recent_array,
        userId: location.userId,
      },
    });
  }, [recent]);

  useEffect(() => {
    if (!location.accessToken) return;
    console.log("hit");
    axios
      .get("/api/listening-history", {
        params: {
          userId: location.userId,
        },
      })
      .then((res) => {
        console.log(res);
        setTimeListened(res.data);
        // setTimeListened(res.data.duration / 1000);
      });
  }, [location.accessToken]);

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div>
      {/* {timeListened > 0 ? `${Math.floor(timeListened / 3600)} hours ` : null}
      {timeListened > 0
        ? ` ${Math.floor((timeListened / 60) % 60)} minutes`
        : null} */}
      {/* <ListeningHistoryChart /> */}
      {timeListened.duration > 0 ? timeListened.duration : null}
      {recent.length > 0 ? (
        <div className="mt-12 text-center" style={{ whiteSpace: "pre" }}>
          {recent.map((track, index) => {
            return (
              <TrackEntry
                track={track}
                name={track.name}
                artist={track.artist}
                albumUrl={track.albumUrl}
                chooseTrack={location.chooseTrack}
                key={index}
                index={index + 1}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
