import React, { useState, useEffect } from "react";

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

function GenresBarChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    return;
    <div></div>;
  };
  return (
    <div className=" ml-[-28px] mt-4 w-[350px] h-[325px] sm:w-[450px] md:w-[625px] lg:w-[1000px] xl:w-[1200px] h1:h-[300px] h2:h-[300px] h3:h-[400px] text-xs  h3:sm:text-lg sm:ml-8 ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          barGap={0}
          margin={{ top: 0, right: 0, left: 30, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" width={150} dataKey="genre" />
          <Bar dataKey="occurrence" fill="#2196F3" barSize={30} />
          <Tooltip
            cursor={{ opacity: 0.5 }}
            viewBox={{ x: 0, y: 0, width: 0, height: 0 }}
            content={CustomTooltip}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenresBarChart;
