import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import useAuth from "../hooks/useAuth.jsx";
import Player from "../components/Player.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import SideBar from "../components/Sidebar.jsx";

import { RingLoader } from "react-spinners";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Dashboard({ code }) {
  const queryClient = useQueryClient();

  const [playingTrack, setPlayingTrack] = useState();
  const [page, setPage] = useState("top-artists");
  const [userId, setUserId] = useState("");

  const [scrollTop, setScrollTop] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(900);
  const [clientHeight, setClientHeight] = useState(0);

  const [artistsTimeSelect, setArtistsTimeSelect] = useState("");
  const [tracksTimeSelect, setTracksTimeSelect] = useState("");

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  const accessToken = useAuth(code);
  // console.log(code);

  function choosePage(page) {
    setPage(page);
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  // grab the scroll positioning in the parent and then it's easier to utilize later on
  function handleScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((res) => setUserId(res.body.id));
  }, [accessToken]);

  const getArtistsQueryShort = useQuery({
    queryKey: ["artists_short"],
    queryFn: () => queryArtists("short_term"),
    enabled: userId !== "",
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const getArtistsQueryMedium = useQuery({
    queryKey: ["artists_medium"],
    queryFn: () => queryArtists("medium_term"),
    enabled: userId !== "",
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const getArtistsQueryLong = useQuery({
    queryKey: ["artists_long"],
    queryFn: () => queryArtists("long_term"),
    enabled: userId !== "",
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // const getTracksQueryShort = useQuery({
  //   queryKey: ["tracks_short"],
  //   queryFn: () => queryTracks("short_term"),
  //   enabled: userId !== "",
  //   refetchOnWindowFocus: false,
  //   staleTime: Infinity,
  //   refetchOnmount: false,
  //   refetchOnReconnect: false,
  //   retry: false,
  // });

  // const getTracksQueryMedium = useQuery({
  //   queryKey: ["tracks_short"],
  //   queryFn: () => queryTracks("medium_term"),
  //   enabled: userId !== "",
  //   refetchOnWindowFocus: false,
  //   staleTime: Infinity,
  //   refetchOnmount: false,
  //   refetchOnReconnect: false,
  //   retry: false,
  // });

  // const getTracksQueryLong = useQuery({
  //   queryKey: ["tracks_long"],
  //   queryFn: () => queryTracks("long_term"),
  //   enabled: userId !== "",
  //   refetchOnWindowFocus: false,
  //   staleTime: Infinity,
  //   refetchOnmount: false,
  //   refetchOnReconnect: false,
  //   retry: false,
  // });

  function queryArtists(duration) {
    spotifyApi.getMyTopArtists({ time_range: duration }).then((data) => {
      setTopArtists(
        // console.log(data.body.items);
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
          setArtistsTimeSelect(duration);
          return {
            name: artist.name,
            genres: genreString,
            albumUrl: smallestArtistImage.url,
          };
        })
      );
    });

    return topArtists;
  }

  useEffect(() => {
    if (topArtists.length < 1) return;
    let artists_array = topArtists.map((entry) => entry.name);
    let genres_array = topArtists.map((entry) => entry.genres);

    axios
      .post("/api/artists", {
        params: {
          artists: artists_array,
          genres: genres_array,
          duration: artistsTimeSelect,
          userId: userId,
        },
      })
      .then((data) => {
        // console.log(data);
        setLoading(false);
      });
  }, [topArtists]);

  // function queryTracks(duration) {
  //   spotifyApi.getMyTopTracks({ time_range: duration }).then((data) => {
  //     // console.log(data.body.items);
  //     setTopTracks(
  //       data.body.items.map((track) => {
  //         const smallestAlbumImage = track.album.images.reduce(
  //           (smallest, image) => {
  //             if (image.height < smallest.height) return image;
  //             return smallest;
  //           },
  //           track.album.images[0]
  //         );
  //         let artists_string = "";
  //         track.artists.forEach((artist, index) => {
  //           if (index + 1 == track.artists.length) {
  //             return (artists_string += `${artist.name}`);
  //           } else {
  //             return (artists_string += `${artist.name}, `);
  //           }
  //         });
  //         setTracksTimeSelect(duration);

  //         return {
  //           artist: artists_string,
  //           name: track.name,
  //           uri: track.uri,
  //           albumUrl: smallestAlbumImage.url,
  //         };
  //       })
  //     );
  //   });
  // }

  // useEffect(() => {
  //   if (topTracks.length < 1) return;
  //   let tracks_array = topTracks.map((entry) => entry.name);

  //   axios
  //     .post("/api/tracks", {
  //       params: {
  //         tracks: tracks_array,
  //         duration: tracksTimeSelect,
  //         userId: userId,
  //       },
  //     })
  //     .then((data) => {
  //       // console.log(data);
  //     });
  // }, [topArtists]);

  return (
    <section className="h-screen font-Rubik w-screen overflow-y-hidden">
      {!loading ? null : (
        <div className="flex h-[90%] items-center justify-center">
          <RingLoader
            color="#1DB954"
            loading={loading}
            size={250}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className="flex h-[89%] w-auto">
        {accessToken ? (
          <SideBar
            accessToken={accessToken}
            page={page}
            handleClick={choosePage}
          />
        ) : null}
        {accessToken ? (
          <div
            onScroll={handleScroll}
            className="pt-4 w-screen flex-grow h-full items-center justify-center overflow-y-scroll"
          >
            <Outlet
              context={{
                accessToken: accessToken,
                chooseTrack: chooseTrack,
                scrollTop: scrollTop,
                offsetHeight: offsetHeight,
                clientHeight: clientHeight,
                userId: userId,
              }}
            />
          </div>
        ) : null}
      </div>

      <footer className="sticky bottom-0">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </footer>
    </section>
  );
}
