"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/client-api";
import { StudyTimer } from "@/components/study-timer";

type DashboardData = {
  savedProblems: { id: string; question: string; topic?: { name: string } | null }[];
  weakAreas: { id: string; score: number; topic: { name: string } }[];
  formulaOfTheDay: { title: string; expression: string; explanation: string } | null;
  progressStats: { totalSaved: number; weakTopics: number; avgScore: number };
};

const quotes = [
  "Confusion means your brain is stretching—stay with it.",
  "You don't need to be fast. You need to be consistent.",
  "Every solved step is a brick in your confidence wall."
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api<DashboardData>("/api/dashboard")
      .then(setData)
      .catch((e: Error) => setError(e.message));
  }, []);

  const quote = useMemo(() => quotes[new Date().getDate() % quotes.length], []);

  return (
    <div className="space-y-6 fade-in-up">
      <div className="rounded-2xl bg-mathGradient p-6">
        <h2 className="text-3xl font-bold">Welcome back 👋</h2>
        <p className="mt-1 text-white/90">Math gets easier when your explanations are clear and your practice is intentional.</p>
      </div>

      {error && <Card className="text-rose-300">{error}. Login/register to unlock personalized data.</Card>}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="soft-hover">
          <h3 className="mb-3 font-semibold">Recently Saved Problems</h3>
          <ul className="space-y-2 text-sm text-muted">
            {data?.savedProblems?.length ? data.savedProblems.map((p) => <li key={p.id}>• {p.question} {p.topic ? `(${p.topic.name})` : ""}</li>) : <li>No problems yet.</li>}
          </ul>
        </Card>
        <Card className="soft-hover">
          <h3 className="mb-3 font-semibold">Weak Topics</h3>
          <ul className="space-y-2 text-sm text-muted">
            {data?.weakAreas?.length ? data.weakAreas.map((w) => <li key={w.id}>• {w.topic.name} — Score {w.score}</li>) : <li>No weak areas tracked yet.</li>}
          </ul>
        </Card>
        <Card className="soft-hover">
          <h3 className="mb-3 font-semibold">Formula of the Day</h3>
          {data?.formulaOfTheDay ? (
            <div className="text-sm text-muted">
              <p className="font-medium text-white">{data.formulaOfTheDay.title}</p>
              <p>{data.formulaOfTheDay.expression}</p>
              <p>{data.formulaOfTheDay.explanation}</p>
            </div>
          ) : (
            <p className="text-muted">No formula available yet.</p>
          )}
        </Card>
        <Card className="soft-hover">
          <h3 className="mb-3 font-semibold">Progress + Streak</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li>Total Saved Problems: {data?.progressStats.totalSaved ?? 0}</li>
            <li>Weak Topics: {data?.progressStats.weakTopics ?? 0}</li>
            <li>Average Score: {data?.progressStats.avgScore ?? 0}</li>
            <li>Daily Streak: 1 day 🔥</li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="soft-hover">
          <StudyTimer />
        </Card>
        <Card className="soft-hover">
          <h3 className="mb-2 font-semibold">Today&apos;s Motivation</h3>
          <p className="text-sm text-muted">“{quote}”</p>
        </Card>
      </div>
    </div>
  );
}
