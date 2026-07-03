"use client";

import { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";

export default function ScrapeLeadsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    leadsAdded: number;
  } | null>(null);

  const scrapeLeads = async () => {
    if (!search.trim()) {
      alert("Enter a business search");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/scrape-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: search,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to scrape leads");
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Lead scraping failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Scrape Leads</h1>

          <p className="mt-2 text-zinc-400">
            Find businesses and automatically add leads to RingFlow.
          </p>
        </div>

        <div className="max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900 p-8">
          <label className="mb-3 block text-sm text-zinc-400">
            Business Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Example: Plumbers in London"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-4 text-white outline-none transition focus:border-emerald-500"
          />

          <p className="mt-3 text-sm text-zinc-500">
            Enter a business type and location.
          </p>

          <button
            onClick={scrapeLeads}
            disabled={loading}
            className="mt-6 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Scraping Leads..." : "Scrape Leads"}
          </button>
        </div>

        {result && (
          <div className="max-w-3xl rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <h2 className="text-lg font-semibold text-emerald-400">
              Scraping Completed ✓
            </h2>

            <p className="mt-2 text-zinc-300">
              {result.message}
            </p>

            <div className="mt-5">
              <p className="text-sm text-zinc-400">
                Leads Added
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {result.leadsAdded}
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}