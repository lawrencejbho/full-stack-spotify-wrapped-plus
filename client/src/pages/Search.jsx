import React from "react";
import TrackSearchResults from "../components/TrackSearchResults.jsx";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false; // if a new request is made then we want to cancel the original request
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/api/lyrics", {
        params: {
          track: playingTrack.title,
          artists: playingTrack.artists,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

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
