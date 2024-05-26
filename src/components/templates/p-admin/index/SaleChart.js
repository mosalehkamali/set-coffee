"use client";

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SaleChart() {
  const data = [
    {
      date: "02/02/01",
      sale: 4000,
    },
    {
      date: "02/02/02",
      sale: 3500,
    },
    {
      date: "02/02/03",
      sale: 1000,
    },
    {
      date: "02/02/04",
      sale: 2300,
    },
    {
      date: "02/02/05",
      sale: 5000,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="92.7%">
        <AreaChart width={500} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sale"
            stroke="#4B1312"
            fill="#711D1C"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default SaleChart;
