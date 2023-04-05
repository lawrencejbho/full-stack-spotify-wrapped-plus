import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GenreEntry({ genre, occurrence, index, total }) {
  const calc = (occurrence * 100) / total;

  const style = { width: `${calc}%` };
  console.log(style);
  return (
    <div className="flex pl-4 py-2 space-x-6 hover:bg-gray-100" key={index}>
      <div className="flex justify-center items-center min-w-[20px]">
        {index}
      </div>

      <div className="justify-start items-start">
        <div className="font-bold items-start justify-start text-start">
          {genre}
        </div>
      </div>
    </div>
  );
}
