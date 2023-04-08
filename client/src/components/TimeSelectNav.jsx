import React, { useState, useRef } from "react";
import TimeSelectItem from "./TimeSelectItem.jsx";

export default function TimeSelect({ timeSelect, handleClick }) {
  return (
    <div className="flex text-center space-x-12 sm:space-x-2 mt-4 pl-5 sm:pl-0 font-bold underline-offset-[6px] ">
      <TimeSelectItem
        timeSelect={timeSelect}
        duration="short_term"
        handleClick={handleClick}
        display="This month"
      />

      <TimeSelectItem
        timeSelect={timeSelect}
        duration="medium_term"
        handleClick={handleClick}
        display="Last 6 months"
      />
      <TimeSelectItem
        timeSelect={timeSelect}
        duration="long_term"
        handleClick={handleClick}
        display="All time"
      />
    </div>
  );
}
