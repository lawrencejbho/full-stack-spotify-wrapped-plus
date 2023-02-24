import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function TopArtist({ accessToken }) {
  const location = useOutletContext();
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.getMyTopArtists().then((data) => {
      // console.log(data.body.items);
      setTopArtists(
        data.body.items.map((artist) => {
          return {
            name: artist.name,
          };
        })
      );
    });
  }, [location.accessToken]);

  return (
    <div>
      {topArtists.length > 0 ? (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {topArtists.map((artist, index) => {
            return <div key={index}>{artist.name}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}
