"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { tokenKey } from "@/lib/client-api";

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
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem(tokenKey);
    router.push("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <h1 className="bg-mathGradient bg-clip-text text-2xl font-black text-transparent">MathBro</h1>
          <div className="flex flex-wrap gap-2 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className={cn("rounded-lg px-3 py-1 transition", path === href ? "bg-white/10 text-white" : "text-muted hover:text-white")}>
                {label}
              </Link>
            ))}
            <button onClick={logout} className="rounded-lg border border-white/10 px-3 py-1 text-muted transition hover:text-white">
              Logout
            </button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">{children}</main>
    </div>
  );
}
