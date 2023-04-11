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
  const [topArtists, setTopArtists] = useState({});
  const [timeSelect, setTimeSelect] = useState("short_term");

  const [artistsChange, setArtistsChange] = useState([]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  useEffect(() => {
    if (!location.accessToken) return;

    axios
      .get("/api/artists-rank-change", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        if (data.status == 204) {
          return;
        } else {
          // console.log(data);
          setArtistsChange(data.data);
        }
      });

    // spotifyApi.getMyTopArtists({ time_range: timeSelect }).then((data) => {
    //   // console.log(data.body.items);
    //   setTopArtists(
    //     data.body.items.map((artist) => {
    //       // albums images aren't guaranteed to be ordered by size so use reduce
    //       const smallestArtistImage = artist.images.reduce(
    //         (smallest, image) => {
    //           if (image.height < smallest.height) return image;
    //           return smallest;
    //         },
    //         artist.images[0]
    //       );
    //       let genreString = "";
    //       const firstThreeGenres = artist.genres.forEach((genre, index) => {
    //         if (index < 3) {
    //           genreString += `${genre}, `;
    //         }
    //       });
    //       genreString = genreString.substring(0, genreString.length - 2);
    //       // this will capitalize each word
    //       genreString = genreString.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    //         letter.toUpperCase()
    //       );
    //       return {
    //         name: artist.name,
    //         genres: genreString,
    //         albumUrl: smallestArtistImage.url,
    //       };
    //     })
    //   );
    // });

    axios
      .get("/api/artists", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        setTopArtists(data.data[0]);
      });
  }, [location.accessToken, timeSelect]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className="overflow-x-hidden">
      {topArtists?.artists?.length > 0 ? (
        <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />
      ) : null}

      {topArtists?.artists?.length > 0 ? (
        <div className="mt-12" style={{ whiteSpace: "pre" }}>
          {topArtists.artists.map((artist, index) => {
            return (
              <ArtistEntry
                albumUrl={topArtists.albums[index]}
                name={artist}
                genres={topArtists.genres[index]}
                artistChange={artistsChange[index]}
                index={index + 1}
                key={index}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
