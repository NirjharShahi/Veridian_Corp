"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          VERIDIAN
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/agent"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            AI Agent
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Operations
          </Link>

          <Link
            href="/knowledge-base"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Knowledge Base
          </Link>
        </nav>
      </div>
    </header>
  );
}
