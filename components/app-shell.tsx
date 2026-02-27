"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  ["/", "Dashboard"],
  ["/ask-ai", "Ask AI"],
  ["/topics", "Topics"],
  ["/formulas", "Formula Vault"],
  ["/practice", "Practice"],
  ["/weak-areas", "Weak Areas"]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="bg-mathGradient bg-clip-text text-2xl font-black text-transparent">MathBro</h1>
          <div className="flex gap-2 overflow-auto text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className={cn("rounded-lg px-3 py-1", path === href ? "bg-white/10 text-white" : "text-muted hover:text-white")}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">{children}</main>
    </div>
  );
}
