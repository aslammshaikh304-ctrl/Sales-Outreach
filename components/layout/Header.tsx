export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-8">
      <div>
        <h2 className="text-xl font-semibold text-white">
          RingFlow
        </h2>

        <p className="text-sm text-zinc-400">
          AI Outreach Dashboard
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold text-white">
        R
      </div>
    </header>
  );
}