"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { tokenKey } from "@/lib/client-api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit() {
    setError("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    localStorage.setItem(tokenKey, data.token);
    router.push("/");
  }

  return (
    <Card className="mx-auto max-w-md space-y-3">
      <h2 className="text-2xl font-bold">Login</h2>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-sm text-rose-300">{error}</p>}
      <Button onClick={onSubmit}>Login</Button>
      <p className="text-sm text-muted">No account? <Link className="text-cyan-300" href="/register">Register</Link></p>
    </Card>
  );
}
