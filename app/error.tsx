"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-white">
      <div className="max-w-lg rounded-xl border border-red-900 bg-zinc-900 p-8 text-center">
        <h1 className="text-2xl font-bold">RingFlow could not load this page</h1>
        <p className="mt-3 text-zinc-400">The data service is temporarily unavailable. No data was changed.</p>
        <button onClick={reset} className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 font-medium hover:bg-emerald-500">Try again</button>
      </div>
    </main>
  );
}

