"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client-api";

export default function FormulaVaultPage() {
  const [q, setQ] = useState("");
  const [formulas, setFormulas] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => { api<any[]>(`/api/formulas?q=${encodeURIComponent(q)}`).then(setFormulas).catch(() => setFormulas([])); }, [q]);

  const current = useMemo(() => formulas[index % (formulas.length || 1)], [formulas, index]);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="mb-2 text-xl font-bold">Formula Vault</h2>
        <Input placeholder="Search formulas..." value={q} onChange={(e) => setQ(e.target.value)} />
      </Card>
      <Card>
        <h3 className="mb-2 font-semibold">Flashcard Mode</h3>
        {current ? (
          <div className="space-y-2">
            <p className="text-sm text-muted">{reveal ? current.expression : current.title}</p>
            {reveal && <p className="text-xs text-muted">{current.explanation}</p>}
            <div className="flex gap-2">
              <Button onClick={() => setReveal((v) => !v)}>{reveal ? "Hide" : "Reveal"}</Button>
              <Button onClick={() => { setIndex((i) => i + 1); setReveal(false); }}>Next</Button>
            </div>
          </div>
        ) : <p className="text-muted">No formulas found.</p>}
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {formulas.map((f) => <Card key={f.id}><p className="font-medium">{f.title}</p><p className="text-sm text-muted">{f.expression}</p><button className="text-xs text-cyan-300">☆ Bookmark</button></Card>)}
      </div>
    </div>
  );
}
