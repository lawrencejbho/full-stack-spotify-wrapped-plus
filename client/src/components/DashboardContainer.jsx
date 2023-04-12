import React from "react";

export default function DashboardContainer(data) {
  return (
    <div>
      {data.map((item, index) => {
        return;
        <div>{item}</div>;
      })}
    </div>
  );
}
