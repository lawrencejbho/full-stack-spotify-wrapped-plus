import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

import TimeSelectNav from "../components/TimeSelectNav.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function TopArtist({ accessToken }) {
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
      console.log(data.body.items);
      setTopArtists(
        data.body.items.map((artist) => {
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

  function changeTime(duration) {
    console.log("hit");
    console.log(duration);
    setTimeSelect(duration);
  }

  return (
    <div>
      <TimeSelectNav timeSelect={timeSelect} handleClick={changeTime} />

      {topArtists.length > 0 ? (
        <div className="mt-12" style={{ whiteSpace: "pre" }}>
          {topArtists.map((artist, index) => {
            return (
              <div className="flex m-4 space-x-6" key={index}>
                <div className="flex justify-center items-center min-w-[20px]">
                  {index + 1}
                </div>
                <img
                  src={artist.albumUrl}
                  className="rounded-md w-[50px] h-[64px] object-cover"
                />
                <div className="justify-start items-start">
                  <div className="font-bold items-start justify-start text-start">
                    {artist.name}
                  </div>
                  <div className="font-light text-sm justify-start text-start text-gray-500">
                    {artist.genres}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
