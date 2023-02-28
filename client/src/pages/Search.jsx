import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useOutletContext } from "react-router-dom";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

import TrackSearchResults from "../components/TrackSearchResults.jsx";
import Searchbar from "../components/Searchbar.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [playingTrack, setPlayingTrack] = useState(false);
  const location = useOutletContext();
  const [currentScrollHeight, setCurrentScrollHeight] = useState(900);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!location.accessToken) return;
    spotifyApi.setAccessToken(location.accessToken);
  }, [location.accessToken]);

  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    remove,
  } = useInfiniteQuery({
    queryKey: ["search", search],
    queryFn: ({ pageParam = 0 }) => searchTracks(pageParam),
    enabled: search !== "" && location.accessToken !== undefined,
    getNextPageParam: (lastPage, pages) => {
      return (pages.length - 1) * 20 + 20;
    },
    refetchOnWindowFocus: false,
  });

  // this function doesn't cancel previous requests as your are searching, but the response data is updated to the last response
  function searchTracks(current_offset) {
    return axios
      .get("https://api.spotify.com/v1/search/", {
        params: {
          type: "track",
          q: search,
          access_token: location.accessToken,
          limit: 20,
          offset: current_offset,
        },
      })
      .then((res) => {
        return res?.data?.tracks?.items?.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artists: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  // update the total scroll positioning as we continue scroll down
  useEffect(() => {
    if (currentScrollHeight - location.scrollTop <= 100) {
      if (search !== "") fetchNextPage();
      setCurrentScrollHeight((prevValue) => prevValue + 1500);
    }
  }, [location.scrollTop]);

  // clears out the scrollHeight calculation if we press the x button in the search
  useEffect(() => {
    if (search == "") setCurrentScrollHeight(900);
  }, [search]);

  // when this page unmounts, it'll remove react query client and clear out our query data
  useEffect(() => {
    return () => remove();
  }, []);

  function clearSearch(track) {
    if (track) {
      setSearch("");
      setPlayingTrack(track);
      setCurrentScrollHeight(900);
    }
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("/api/lyrics", {
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
    <>
      <Searchbar setSearch={setSearch} serach={search} />

      <div className="mt-4 ">
        <button className="invisible" onClick={fetchNextPage}>
          Load More
        </button>
        <div className="w-full">
          {data &&
            data.pages?.map((item, outer_index) =>
              item?.map((track, inner_index) => {
                let final_index = outer_index * 20 + inner_index;
                return (
                  <TrackSearchResults
                    index={final_index + 1}
                    track={track}
                    key={track.uri}
                    chooseTrack={location.chooseTrack}
                    clearSearch={clearSearch}
                  />
                );
              })
            )}
          {searchResults.length === 0 && (
            <div className="" style={{ whiteSpace: "pre" }}>
              {search !== "" ? null : lyrics}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
