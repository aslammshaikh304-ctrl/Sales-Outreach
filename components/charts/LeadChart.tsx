"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  data: {
    day: string;
    leads: number;
  }[];
};

export default function LeadChart({ data }: Props) {
  return (
    <div className="h-[350px] rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Lead Performance
      </h2>

      {data.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center text-zinc-500">
          No lead data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

           <Tooltip
  contentStyle={{
    background: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: "10px",
  }}
  labelStyle={{ color: "#fff" }}
  formatter={(value) => [`${value} Leads`, "Leads"]}
/>

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#10b981" 
              strokeWidth={3}
              fill="url(#leadGradient)"
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}