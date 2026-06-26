"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Leads", href: "/leads" },
  { name: "Outreach", href: "/outreach" },
  { name: "Replies", href: "/replies" },
  { name: "SMTP", href: "/smtp" },
  { name: "Inbox Health", href: "/inbox-health" },
  { name: "Analytics", href: "/analytics" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900 p-6">
      <h1 className="text-2xl font-bold text-emerald-500">
        RingFlow
      </h1>

      <p className="mt-1 text-sm text-zinc-400">
        AI Outreach Engine
      </p>

      <nav className="mt-10 space-y-2">
        {menus.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-emerald-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}