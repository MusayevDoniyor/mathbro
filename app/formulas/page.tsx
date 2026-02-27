"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client-api";

type Formula = {
  id: string;
  title: string;
  expression: string;
  explanation: string;
};

export default function FormulaVaultPage() {
  const [query, setQuery] = useState("");
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    api<Formula[]>(`/api/formulas?q=${encodeURIComponent(query)}`).then(setFormulas).catch(() => setFormulas([]));
  }, [query]);

  const current = useMemo(() => formulas[index % (formulas.length || 1)], [formulas, index]);

  return (
    <div className="space-y-4 fade-in-up">
      <Card className="soft-hover">
        <h2 className="mb-2 text-xl font-bold">Formula Vault</h2>
        <Input placeholder="Search formulas..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </Card>
      <Card className="soft-hover">
        <h3 className="mb-2 font-semibold">Flashcard Mode</h3>
        {current ? (
          <div className="space-y-2">
            <p className="text-sm text-muted">{reveal ? current.expression : current.title}</p>
            {reveal && <p className="text-xs text-muted">{current.explanation}</p>}
            <div className="flex gap-2">
              <Button onClick={() => setReveal((value) => !value)}>{reveal ? "Hide" : "Reveal"}</Button>
              <Button onClick={() => { setIndex((value) => value + 1); setReveal(false); }}>Next</Button>
            </div>
          </div>
        ) : <p className="text-muted">No formulas found.</p>}
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {formulas.map((formula) => (
          <Card key={formula.id} className="soft-hover">
            <p className="font-medium">{formula.title}</p>
            <p className="text-sm text-muted">{formula.expression}</p>
            <button className="text-xs text-cyan-300">☆ Bookmark</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
