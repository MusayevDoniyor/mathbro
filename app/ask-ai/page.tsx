"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/client-api";

type SolveResponse = { steps: string[]; finalAnswer: string; summary: string };

export default function AskAiPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<SolveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function ask() {
    setLoading(true);
    setStatus("");

    try {
      const data = await api<SolveResponse>("/api/ai/solve", {
        method: "POST",
        body: JSON.stringify({ question })
      });
      setResponse(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  }

  async function save(confusing = false) {
    if (!response) return;

    try {
      await api("/api/saved-problems", {
        method: "POST",
        body: JSON.stringify({ question, solution: `${response.steps.join("\n")}\nFinal: ${response.finalAnswer}`, confusing })
      });
      setStatus(confusing ? "Marked as confusing and saved." : "Saved to your notebook.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save.";
      setStatus(message);
    }
  }

  return (
    <div className="space-y-4 fade-in-up">
      <Card className="soft-hover">
        <h2 className="mb-3 text-xl font-bold">Ask MathBro AI</h2>
        <p className="mb-3 text-sm text-muted">Ask exactly what confuses you. You&apos;ll get a calm, step-by-step explanation.</p>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input placeholder="e.g., Solve 2x² + 3x - 5 = 0" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <Button onClick={ask} disabled={loading || !question}>{loading ? "Thinking..." : "Solve"}</Button>
        </div>
      </Card>

      {status && <Card className="text-sm text-cyan-200">{status}</Card>}

      {response && (
        <Card className="space-y-2 soft-hover">
          <h3 className="font-semibold">Step-by-step explanation</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-muted">
            {response.steps?.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
          <p><strong>Final answer:</strong> {response.finalAnswer}</p>
          <p className="text-sm text-muted">{response.summary}</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => save(false)}>Save this problem</Button>
            <Button className="bg-amber-600" onClick={() => save(true)}>Mark as confusing</Button>
          </div>
          <p className="text-xs text-muted">Small wins count. Even understanding one line today is real progress.</p>
        </Card>
      )}
    </div>
  );
}
