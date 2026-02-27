"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/client-api";

const bank = [
  { q: "Solve 3x = 12", a: "4", topic: "Algebra" },
  { q: "Area of circle formula?", a: "pi r^2", topic: "Geometry" },
  { q: "sin(90°)", a: "1", topic: "Trigonometry" },
  { q: "Derivative of x^3", a: "3x^2", topic: "Calculus" },
  { q: "2+2*2", a: "6", topic: "Algebra" }
];

export default function PracticePage() {
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [topics, setTopics] = useState<any[]>([]);
  const quiz = useMemo(() => bank.slice(0, 5), []);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => { api<any[]>("/api/topics").then(setTopics).catch(() => setTopics([])); }, []);

  async function submit() {
    const correct = quiz.filter((q, i) => answers[i].trim().toLowerCase() === q.a.toLowerCase()).length;
    const computed = Math.round((correct / 5) * 100);
    setScore(computed);

    const weakest = quiz.find((_, i) => answers[i].trim().toLowerCase() !== quiz[i].a.toLowerCase());
    if (weakest) {
      const topic = topics.find((t) => t.name === weakest.topic);
      if (topic) {
        await api("/api/practice/submit", {
          method: "POST",
          body: JSON.stringify({ topicId: topic.id, score: computed })
        });
      }
    }
  }

  return (
    <div className="space-y-4">
      <Card><h2 className="text-xl font-bold">Practice Mode</h2><p className="text-sm text-muted">Solve this 5-question quiz and auto-track weak areas.</p></Card>
      {quiz.map((item, i) => (
        <Card key={i}>
          <p className="font-medium">Q{i + 1}. {item.q}</p>
          <Input value={answers[i]} onChange={(e) => setAnswers((prev) => prev.map((a, idx) => idx === i ? e.target.value : a))} placeholder="Your answer" />
        </Card>
      ))}
      <Button onClick={submit}>Submit Quiz</Button>
      {score !== null && <Card><p>Your score: {score}/100</p><p className="text-sm text-muted">Suggestion: {score < 60 ? "Revise Quadratic Equations and Trigonometric Identities" : "Great progress, keep practicing."}</p></Card>}
    </div>
  );
}
