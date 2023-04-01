import React from "react";
import { Line, LineChart } from "recharts";

// const data = [
//   { name: "2017", react: 32 },
//   { name: "2017", react: 45 },
//   { name: "2017", react: 67 },
//   { name: "2017", react: 51 },
//   { name: "2017", react: 80 },
// ];

function ListeningHistoryChart({ data }) {
  console.log(data);
  return (
    <LineChart width={600} height={600} data={data}>
      <Line type="monotone" dataKey="duration" stroke="#2196F3" />
    </LineChart>
  );
}

export default ListeningHistoryChart;
