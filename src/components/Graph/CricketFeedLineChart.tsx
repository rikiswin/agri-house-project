"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

interface CricketFeedData {
  date: string;
  feedAmount: number;
}

interface CricketFeedLineChartProps {
  data: CricketFeedData[];
}

interface CustomTooltipProps {
  active: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-bold text-sm text-gray-600">
          {label && new Date(label).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="text-indigo-600 font-semibold">
          <span className="text-gray-500">Feed Amount:</span>{" "}
          {payload[0]?.value} grams
        </p>
      </div>
    );
  }
  return null;
};

const CricketFeedLineChart: React.FC<CricketFeedLineChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No feed data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 40,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

        <XAxis
          dataKey="date"
          tick={{
            fill: "#6b7280",
            fontSize: 12,
          }}
          tickFormatter={(dateStr) =>
            new Date(dateStr).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
          label={{
            value: "Date",
            position: "bottom",
            style: { fill: "#374151", fontSize: 14 },
            dx: -30,
          }}
        />

        <YAxis
          tick={{ fill: "#6b7280", fontSize: 12 }}
          label={{
            value: "Feed Amount (grams)",
            angle: -90,
            position: "left",
            style: { fill: "#374151", fontSize: 14 },
            dy: -60,
          }}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          verticalAlign="top"
          height={50}
          iconType="circle"
          iconSize={10}
          wrapperStyle={{ paddingBottom: 10 }}
          formatter={(value) => (
            <span className="text-gray-600 text-sm">Feed Amount</span>
          )}
        />

        <Area
          type="monotone"
          dataKey="feedAmount"
          strokeWidth={0}
          fill="url(#areaGradient)"
          activeDot={false}
        />

        <Line
          type="monotone"
          dataKey="feedAmount"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ fill: "white", strokeWidth: 2, stroke: "#6366f1" }}
          activeDot={{
            r: 8,
            fill: "#fff",
            stroke: "#6366f1",
            strokeWidth: 2,
          }}
          animationDuration={500}
        />

        <text
          x="50%"
          y={20}
          textAnchor="middle"
          className="text-lg font-semibold fill-gray-700"
        >
          Cricket Feed Consumption Over Time
        </text>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CricketFeedLineChart;