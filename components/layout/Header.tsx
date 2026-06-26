export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          RingFlow
        </h2>

        <p className="text-sm text-zinc-400">
          AI Outreach Dashboard
        </p>
      </div>

      <div className="h-10 w-10 rounded-full bg-emerald-500" />
    </header>
  );
}