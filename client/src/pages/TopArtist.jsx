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

  const [artistId, setArtistId] = useState("");
  const [artistTopTracks, setArtistTopTracks] = useState([]);

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

    axios
      .get("/api/artists", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        // console.log(data.data[0]);
        setTopArtists(data.data[0]);
      });
  }, [location.userId, timeSelect]);

  useEffect(() => {
    // spotifyApi
    //   .getArtistRelatedArtists("16yUpGkBRgc2eDMd3bB3Uw")
    //   .then((data) => {
    //     console.log(data);
    //   });
    if (artistId == "") {
      setArtistTopTracks([]);
      return;
    }
    spotifyApi.getArtistTopTracks(artistId, "US").then((data) => {
      // console.log(data.body.tracks);
      setArtistTopTracks(
        data?.body?.tracks?.slice(0, 5).map((item) => {
          const smallestAlbumImage = item.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.album.images[0]
          );
          let artists_string = "";
          item.artists.forEach((artist, index) => {
            if (index + 1 == item.artists.length) {
              return (artists_string += `${artist.name}`);
            } else {
              return (artists_string += `${artist.name}, `);
            }
          });

          return {
            artist: artists_string,
            name: item.name,
            uri: item.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [artistId]);

  function changeTime(duration) {
    setTimeSelect(duration);
  }

  function changeId(id) {
    if (id == artistId) {
      setArtistId("");
      setArtistTopTracks([]);
    } else {
      setArtistId(id);
    }
  }

  // function styles(id) {
  //   if (id == artistId) {
  //     console.log("hitting");
  //     return {
  //       backgroundColor: "blue",
  //     };
  //   }
  // }

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
          {topArtists.artists.map((entry, index) => {
            const { name, id } = JSON.parse(entry);
            return (
              <ArtistEntry
                changeId={changeId}
                albumUrl={topArtists.albums[index]}
                name={name}
                genres={topArtists.genres[index]}
                artistChange={artistsChange[index]}
                index={index + 1}
                key={index}
                id={id}
                // style={styles(id)}
                // style={{ backgroundColor: id == artistId ? "blue" : "red" }}
                chooseTrack={location.chooseTrack}
                topTracks={id == artistId ? artistTopTracks : null}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
