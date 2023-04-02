import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "2017", react: 32 },
//   { name: "2017", react: 45 },
//   { name: "2017", react: 67 },
//   { name: "2017", react: 51 },
//   { name: "2017", react: 80 },
// ];

function ListeningHistoryChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const hours = Math.floor(payload[0].value);
      const hours_string = hours == 0 ? "" : `${hours} hours`;

      return (
        <div className="">
          <p className="label">{`${label}`}</p>
          <p className="label">{`Duration: ${hours_string} ${
            Math.floor(payload[0].value * 60) % 60
          } minutes`}</p>
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        className="overflow-hidden"
        margin={{ top: 5, right: 50, bottom: 5, left: 0 }}
      >
        <Area type="monotone" dataKey="duration" stroke="#2196F3" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="calendar_date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ListeningHistoryChart;
