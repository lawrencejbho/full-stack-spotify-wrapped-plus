import React from "react";

export default function Dashboard(accessToken, title) {
  const location = useOutletContext();

  const [timeSelect, setTimeSelect] = useState("short_term");
  const [topArtists, setTopArtists] = useState({});
  const [topTracks, setTopTracks] = useState({});
  const [topGenres, setTopGenres] = useState({});

  useEffect(() => {
    axios
      .get("/api/artists", {
        params: { userId: location.userId, duration: timeSelect },
      })
      .then((res) => {
        setTopArtists(data.data[0]);
      });
    axios
      .get("/api/tracks", {
        params: {
          duration: timeSelect,
          userId: location.userId,
        },
      })
      .then((data) => {
        // console.log(data.data[0]);
        setTopTracks(data.data[0]);
      });
    axios
      .get("/api/genres", {
        params: { userId: location.userId, duration: timeSelect },
      })
      .then((res) => {
        // console.log(res);
        const data = res.data.genres.map((entry) => {
          return JSON.parse(entry);
        });
        setTopGenres(data);
      });
  }, [location.userId, timeSelect]);

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div>
      {topGenres.length > 0 ? (
        <DashboardContainer data={topGenres.slice(0, 5)} />
      ) : null}
    </div>
  );
}
