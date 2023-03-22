import React, { useState, useEffect } from "react";

import Hero from "../assets/wp.png";

// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=42d4174a9b25462c83b89191088e7abf&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=501daf7d1dfb43a291ccc64c91c8a4c8&response_type=code&redirect_uri=https://wrappedplus.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

export default function Login() {
  return (
    <div className="bg-gray-400">
      <div className="flex justify-center">
        <span className="absolute font-Montserrat text-lg  pt-20 text-white">
          WRAPPED PLUS
        </span>
      </div>

      <div className="h-screen w-screen z-0 absolute flex items-center justify-start sm:justify-center">
        <img src={Hero} className=" sm:w-[75%] xl:w-[850px]" />
      </div>

      <section className="z-20 flex items-end  sm:items-center justify-center h-screen w-screen">
        <a className="" href={AUTH_URL}>
          <button className="group relative border mb-24 sm:mb-0 h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
            <div className="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-gray-700 group-hover:text-white">
              Login With Spotify
            </span>
          </button>
        </a>
      </section>

      <div className=" flex justify-center ">
        <span className="bottom-16 absolute cursor-pointer text-white">
          What is this?
        </span>
      </div>
    </div>
  );
}
