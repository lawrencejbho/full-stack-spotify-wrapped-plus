import React, { useState } from "react";

import { BsPlayFill } from "react-icons/bs";

export default function RelatedArtistsDropdown({
  name,
  genres,
  artistImage,
  index,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-screen flex pl-2 sm:pl-4 py-2 space-x-2 sm:space-x-6 hover:bg-gray-100 cursor-pointer"
      key={index}
      // style={styles()}
    >
      <div className="pl-16 flex flex-col justify-center items-center min-w-[20px]">
        {index}
      </div>
      <img
        src={artistImage}
        className="rounded-md w-[50px] h-[64px] object-cover"
      />
      <div className="justify-start items-start w-full flex-wrap">
        <div className="font-bold items-start justify-start text-start">
          {name}
        </div>
        <div className="overflow-x-hidden flex-wrap font-light text-sm justify-start text-start text-gray-500">
          {genres}
        </div>
      </div>
    </div>
  );
}
