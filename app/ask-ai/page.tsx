"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/client-api";

export default function AskAiPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<{ steps: string[]; finalAnswer: string; summary: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    try {
      const data = await api<{ steps: string[]; finalAnswer: string; summary: string }>("/api/ai/solve", {
        method: "POST",
        body: JSON.stringify({ question })
      });
      setResponse(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(confusing = false) {
    if (!response) return;
    await api("/api/saved-problems", {
      method: "POST",
      body: JSON.stringify({ question, solution: `${response.steps.join("\n")}\nFinal: ${response.finalAnswer}`, confusing })
    });
    alert(confusing ? "Marked as confusing and saved." : "Saved problem.");
  }

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="mb-3 text-xl font-bold">Ask MathBro AI</h2>
        <div className="flex gap-2">
          <Input placeholder="e.g., Solve 2x^2 + 3x - 5 = 0" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <Button onClick={ask} disabled={loading || !question}>{loading ? "Thinking..." : "Solve"}</Button>
        </div>
      </Card>
      {response && (
        <Card className="space-y-2">
          <h3 className="font-semibold">Step-by-step explanation</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-muted">{response.steps?.map((s, i) => <li key={i}>{s}</li>)}</ol>
          <p><strong>Final answer:</strong> {response.finalAnswer}</p>
          <p className="text-sm text-muted">{response.summary}</p>
          <div className="flex gap-2">
            <Button onClick={() => save(false)}>Save this problem</Button>
            <Button className="bg-amber-600" onClick={() => save(true)}>Mark as confusing</Button>
          </div>
          <p className="text-xs text-muted">Motivation: You&apos;re not bad at math—you&apos;re building it one clear step at a time.</p>
        </Card>
      )}
    </div>
  );
}
