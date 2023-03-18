import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItem({
  image,
  accessToken,
  pathname,
  handleClick,
  page,
  display,
}) {
  const [mouseHover, setMouseHover] = useState(false);

  function handleMouseOver() {
    setMouseHover(true);
  }

  function handleMouseOut() {
    setMouseHover(false);
  }

  function styles() {
    if (page == pathname) {
      return {
        opacity: 1,
        fontWeight: "bold",
      };
    }
    return {
      opacity: mouseHover ? "1" : ".6",
    };
  }

  return (
    <NavLink
      to={{ pathname: `/${pathname}`, accessToken: accessToken }}
      className="flex flex-col items-center  sm:space-x-1 rounded-md px-2 py-3 hover:bg-gray-100"
      style={styles()}
      onClick={() => handleClick(pathname)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img src={image} className="w-6 sm:w-8 text-center items-center" />
      <span className="text-center sm:text-base text-xs">{display}</span>
    </NavLink>
  );
}
