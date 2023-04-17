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
  const [relatedArtists, setRelatedArtists] = useState([]);

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
    if (artistId == "") {
      setArtistTopTracks([]);
      setRelatedArtists([]);
      return;
    }

    spotifyApi.getArtistRelatedArtists(artistId).then((data) => {
      setRelatedArtists(
        // console.log(data.body.items);
        data.body.artists.slice(0, 5).map((artist) => {
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
            artistImage: smallestArtistImage.url,
            id: artist.id,
          };
        })
      );
    });
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
                relatedArtists={id == artistId ? relatedArtists : null}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
