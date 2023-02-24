import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=501daf7d1dfb43a291ccc64c91c8a4c8&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

export default function Login() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-200">
      <a className="" href={AUTH_URL}>
        <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
          <div className="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-black group-hover:text-white">
            Login With Spotify
          </span>
        </button>
      </a>
    </section>
  );
}
