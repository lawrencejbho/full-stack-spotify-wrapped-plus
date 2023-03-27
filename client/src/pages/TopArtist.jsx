import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

import TimeSelectNav from "../components/TimeSelectNav.jsx";
import ArtistEntry from "../components/ArtistEntry.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function TopArtist({ accessToken, title }) {
  const location = useOutletContext();
  const [topArtists, setTopArtists] = useState([]);
  const [timeSelect, setTimeSelect] = useState("long_term");

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.getMyTopArtists({ time_range: timeSelect }).then((data) => {
      // console.log(data.body.items);
      setTopArtists(
        data.body.items.map((artist) => {
          // albums images aren't guaranteed to be ordered by size so use reduce
          const smallestArtistImage = artist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            artist.images[0]
          );
          let genreString = "";
          const firstThreeGenres = artist.genres.forEach((genre, index) => {
            if (index < 3) {
              genreString += `${genre}, `;
            }
          });
          genreString = genreString.substring(0, genreString.length - 2);
          // this will capitalize each word
          genreString = genreString.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          );
          return {
            name: artist.name,
            genres: genreString,
            albumUrl: smallestArtistImage.url,
          };
        })
      );
    });
  }, [location.accessToken, timeSelect]);

  useEffect(() => {
    if (topArtists.length < 1) return;
    let artists_array = topArtists.map((entry) => entry.name);
    let genres_array = topArtists.map((entry) => entry.genres);

    axios.post("/api/artists", {
      params: {
        artists: artists_array,
        genres: genres_array,
        duration: timeSelect,
        userId: location.userId,
      },
    });
  }, [topArtists]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div className="overflow-x-hidden">
      {topArtists.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}

      {topArtists.length > 0 ? (
        <div className="mt-12" style={{ whiteSpace: "pre" }}>
          {topArtists.map((artist, index) => {
            return (
              <ArtistEntry
                albumUrl={artist.albumUrl}
                name={artist.name}
                genres={artist.genres}
                index={index + 1}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
