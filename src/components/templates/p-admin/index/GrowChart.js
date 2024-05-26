"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function GrowChart() {
  const data = [
    {
      day: "شنبه",
      thisWeek: 4000,
      lastWeek: 1500,
    },
    {
      day: "یکشنبه",
      thisWeek: 3500,
      lastWeek: 2000,
    },
    {
      day: "دوشنبه",
      thisWeek: 1000,
      lastWeek: 3200,
    },
    {
      day: "سه شنبه",
      thisWeek: 2300,
      lastWeek: 2500,
    },
    {
      day: "چهارشنبه",
      thisWeek: 5000,
      lastWeek: 3700,
    },
    {
      day: "پنج شنبه",
      thisWeek: 4358,
      lastWeek: 5269,
    },
    {
      day: "جمعه",
      thisWeek: 300,
      lastWeek: 500,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="92.7%">
        <LineChart width={500} height={200} data={data}>
          <XAxis dataKey="day"/>
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="thisWeek" stroke="#711D1C" />
          <Line type="monotone" dataKey="lastWeek" stroke="#0E0E38" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default GrowChart;
