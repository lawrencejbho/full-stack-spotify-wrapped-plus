import React from "react";

export default function TopArtist({ accessToken }) {
  useEffect(() => {
    if (!accessToken) return;
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
  }, [accessToken]);

  return (
    <div>
      {topArtists.length > 0 ? (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {topArtists.map((artist) => {
            return <div>{artist.name}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}
