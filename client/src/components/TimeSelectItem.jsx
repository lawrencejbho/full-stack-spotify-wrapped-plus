import React, { useState } from "react";

export default function TimeSelectItem({
  timeSelect,
  handleClick,
  duration,
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
    if (timeSelect == duration) {
      return {
        opacity: 1,
        textDecorationLine: "underline",
      };
    }
    return {
      opacity: mouseHover ? "1" : ".7",
    };
  }

  return (
    <div
      onClick={() => handleClick(duration)}
      className="cursor-pointer opacity-70"
      style={styles()}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {display}
    </div>
  );
}
