"use client";
import React from "react";

interface CricketFeedDataRow {
  productionCycle: number;
  feedAmountUsed: number;
  feedSource: string;
  harvestStartDate: string; // or Date
  harvestEndDate?: string | null; // or Date | null
  cycleStatus: string;
  cycleAge: number;
  feedConsumption: number;
  cricketYield: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  // Removed 'id' and 'breedingPenId' from interface if not used anywhere else
}

interface CricketFeedTableProps {
  data: CricketFeedDataRow[];
}

export default function CricketFeedTable({ data }: CricketFeedTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left border-collapse border border-slate-200">
        <thead className="bg-slate-100">
        <tr>
          <th className="px-3 py-2 border border-slate-200">Production Cycle</th>
          <th className="px-3 py-2 border border-slate-200">Feed Amount Used (grams)</th>
          <th className="px-3 py-2 border border-slate-200">Feed Source</th>
          <th className="px-3 py-2 border border-slate-200">Harvest Start</th>
          <th className="px-3 py-2 border border-slate-200">Harvest End</th>
          <th className="px-3 py-2 border border-slate-200">Cycle Status</th>
          <th className="px-3 py-2 border border-slate-200">Cycle Age</th>
          <th className="px-3 py-2 border border-slate-200">Feed Consumption</th>
          <th className="px-3 py-2 border border-slate-200">Cricket Yield</th>
          <th className="px-3 py-2 border border-slate-200">Comment</th>
          <th className="px-3 py-2 border border-slate-200">Created At</th>
          <th className="px-3 py-2 border border-slate-200">Updated At</th>
        </tr>
        </thead>
        <tbody>
        {data.map((feed, index) => (
          <tr key={index} className="hover:bg-slate-50">
            <td className="px-3 py-2 border border-slate-200">
              {feed.productionCycle}
            </td>
            <td className="px-3 py-2 border border-slate-200">
              {feed.feedAmountUsed}
            </td>
            <td className="px-3 py-2 border border-slate-200">{feed.feedSource}</td>
            <td className="px-3 py-2 border border-slate-200">
              {new Date(feed.harvestStartDate).toLocaleDateString()}
            </td>
            <td className="px-3 py-2 border border-slate-200">
              {feed.harvestEndDate
                ? new Date(feed.harvestEndDate).toLocaleDateString()
                : "—"}
            </td>
            <td className="px-3 py-2 border border-slate-200">{feed.cycleStatus}</td>
            <td className="px-3 py-2 border border-slate-200">{feed.cycleAge}</td>
            <td className="px-3 py-2 border border-slate-200">
              {feed.feedConsumption}
            </td>
            <td className="px-3 py-2 border border-slate-200">
              {feed.cricketYield}
            </td>
            <td className="px-3 py-2 border border-slate-200">
              {feed.comment || "—"}
            </td>
            <td className="px-3 py-2 border border-slate-200">
              {new Date(feed.createdAt).toLocaleString()}
            </td>
            <td className="px-3 py-2 border border-slate-200">
              {new Date(feed.updatedAt).toLocaleString()}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
