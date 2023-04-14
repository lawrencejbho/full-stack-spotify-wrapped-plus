import React, { useState, useEffect } from "react";
import axios from "axios";
import AboutModal from "../components/AboutModal.jsx";
import PrivacyModal from "../components/PrivacyModal.jsx";

import Hero from "../assets/wp.png";

export default function Login() {
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    axios.get("/api/spotify-info").then((res) => {
      setAuthUrl(
        `https://accounts.spotify.com/authorize?client_id=${res.data.clientId}&response_type=code&redirect_uri=${res.data.redirect}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-read-recently-played`
      );
    });
  }, []);

  return (
    <div className="bg-gray-400 ">
      <div className="flex justify-center">
        <div className="bottom-16 absolute z-30 flex space-x-2">
          <AboutModal className="" />
          <PrivacyModal />
        </div>
      </div>
      <div className="flex justify-center">
        <span className="absolute font-Montserrat text-lg  pt-20 text-white">
          WRAPPED PLUS
        </span>
      </div>

      <div className="h-screen w-screen overflow-hidden z-0 absolute flex items-center justify-start sm:justify-center">
        <img src={Hero} className=" sm:w-[75%] xl:w-[850px] " />
      </div>

      <section className="z-20 flex items-end  sm:items-center justify-center h-screen w-screen">
        <a className="" href={authUrl}>
          <button className="group relative border mb-32 sm:mb-0 h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
            <div className="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-gray-700 group-hover:text-white font-Rubik">
              Login With Spotify
            </span>
          </button>
        </a>
      </section>
    </div>
  );
}
