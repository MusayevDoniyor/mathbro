"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { tokenKey } from "@/lib/client-api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit() {
    setError("");
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (!response.ok) return setError(data.error);

    localStorage.setItem(tokenKey, data.token);
    router.push("/");
  }

  return (
    <Card className="mx-auto max-w-md space-y-3 fade-in-up soft-hover">
      <h2 className="text-2xl font-bold">Create your MathBro account</h2>
      <p className="text-sm text-muted">Start with one weak topic and build from there.</p>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p className="text-xs text-muted">Use at least 8 characters with uppercase, lowercase, and a number.</p>
      {error && <p className="text-sm text-rose-300">{error}</p>}
      <Button onClick={onSubmit}>Create account</Button>
      <p className="text-sm text-muted">Already have one? <Link className="text-cyan-300" href="/login">Login</Link></p>
    </Card>
  );
}
