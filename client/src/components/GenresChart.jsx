import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function GenresChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    return <div></div>;
  };

  console.log(data);

  return (
    <div className="flex items-center justify-center">
      <div className="text-sm sm:text-lg w-[300px] sm:w-[500px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="genre" />
            <Radar
              name="Amount"
              dataKey="occurrence"
              stroke="#2196F3"
              fill="#2196F3"
              fillOpacity={0.75}
            />
            <Tooltip content={CustomTooltip} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
