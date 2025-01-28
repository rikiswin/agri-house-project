"use client";

import React from "react";

/**
 * Match your Prisma model fields with your TypeScript interface.
 * Adjust "string | null" vs "Date | null" etc. depending on how you're passing data from the server.
 */
export interface CricketFeedData {
  id: string;
  productionCycle: number;
  feedAmountUsed: number;
  feedSource: string;
  harvestStartDate: string;   // or Date if you prefer
  harvestEndDate?: string | null;
  cycleStatus: string;
  cycleAge: number;
  feedConsumption: number;
  cricketYield: number;
  comment?: string | null;
  breedingPenId: string;
  createdAt: string;  // or Date
  updatedAt: string;  // or Date
}

interface CricketFeedDataTableProps {
  data: CricketFeedData[];
}

export default function CricketFeedDataTable({ data }: CricketFeedDataTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left border-collapse border border-slate-200">
        {/* Table Head */}
        <thead className="bg-slate-100">
        <tr>
          <th className="px-4 py-2 border border-slate-200">ID</th>
          <th className="px-4 py-2 border border-slate-200">Production Cycle</th>
          <th className="px-4 py-2 border border-slate-200">Feed Amount Used</th>
          <th className="px-4 py-2 border border-slate-200">Feed Source</th>
          <th className="px-4 py-2 border border-slate-200">Harvest Start</th>
          <th className="px-4 py-2 border border-slate-200">Harvest End</th>
          <th className="px-4 py-2 border border-slate-200">Cycle Status</th>
          <th className="px-4 py-2 border border-slate-200">Cycle Age</th>
          <th className="px-4 py-2 border border-slate-200">Feed Consumption</th>
          <th className="px-4 py-2 border border-slate-200">Cricket Yield</th>
          <th className="px-4 py-2 border border-slate-200">Comment</th>
          <th className="px-4 py-2 border border-slate-200">Breeding Pen ID</th>
          <th className="px-4 py-2 border border-slate-200">Created At</th>
          <th className="px-4 py-2 border border-slate-200">Updated At</th>
        </tr>
        </thead>

        {/* Table Body */}
        <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-slate-50">
            <td className="px-4 py-2 border border-slate-200">{row.id}</td>
            <td className="px-4 py-2 border border-slate-200">{row.productionCycle}</td>
            <td className="px-4 py-2 border border-slate-200">{row.feedAmountUsed}</td>
            <td className="px-4 py-2 border border-slate-200">{row.feedSource}</td>
            <td className="px-4 py-2 border border-slate-200">
              {row.harvestStartDate
                ? new Date(row.harvestStartDate).toLocaleDateString()
                : "N/A"}
            </td>
            <td className="px-4 py-2 border border-slate-200">
              {row.harvestEndDate
                ? new Date(row.harvestEndDate).toLocaleDateString()
                : "N/A"}
            </td>
            <td className="px-4 py-2 border border-slate-200">{row.cycleStatus}</td>
            <td className="px-4 py-2 border border-slate-200">{row.cycleAge}</td>
            <td className="px-4 py-2 border border-slate-200">{row.feedConsumption}</td>
            <td className="px-4 py-2 border border-slate-200">{row.cricketYield}</td>
            <td className="px-4 py-2 border border-slate-200">{row.comment || "—"}</td>
            <td className="px-4 py-2 border border-slate-200">{row.breedingPenId}</td>
            <td className="px-4 py-2 border border-slate-200">
              {new Date(row.createdAt).toLocaleString()}
            </td>
            <td className="px-4 py-2 border border-slate-200">
              {new Date(row.updatedAt).toLocaleString()}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
