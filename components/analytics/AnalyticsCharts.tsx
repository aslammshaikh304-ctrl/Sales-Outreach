"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartPoint = Record<string, string | number>;

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function AnalyticsCharts({
  charts,
}: {
  charts: {
    leadsByDay: ChartPoint[];
    repliesByDay: ChartPoint[];
    leadStatus: ChartPoint[];
  };
}) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Leads */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 font-semibold">Leads Per Day</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts.leadsByDay}>
              <CartesianGrid stroke="#27272a" />
              <XAxis dataKey="day" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip />
              <Line
                dataKey="leads"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Replies */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 font-semibold">Replies Per Day</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.repliesByDay}>
              <CartesianGrid stroke="#27272a" />
              <XAxis dataKey="day" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip />
              <Bar dataKey="replies" fill="#3b82f6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 font-semibold">Lead Status</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={charts.leadStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {charts.leadStatus.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}