"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/client-api";

type Topic = { id: string; name: string };

type QuizQuestion = { q: string; a: string; topic: string };

const bank: QuizQuestion[] = [
  { q: "Solve 3x = 12", a: "4", topic: "Algebra" },
  { q: "Area of circle formula?", a: "pi r^2", topic: "Geometry" },
  { q: "sin(90°)", a: "1", topic: "Trigonometry" },
  { q: "Derivative of x^3", a: "3x^2", topic: "Calculus" },
  { q: "2+2*2", a: "6", topic: "Algebra" }
];

export default function PracticePage() {
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [topics, setTopics] = useState<Topic[]>([]);
  const quiz = useMemo(() => bank.slice(0, 5), []);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    api<Topic[]>("/api/topics").then(setTopics).catch(() => setTopics([]));
  }, []);

  async function submit() {
    const correct = quiz.filter((question, index) => answers[index].trim().toLowerCase() === question.a.toLowerCase()).length;
    const computed = Math.round((correct / 5) * 100);
    setScore(computed);

    const weakest = quiz.find((question, index) => answers[index].trim().toLowerCase() !== question.a.toLowerCase());
    if (!weakest) return;

    const topic = topics.find((item) => item.name === weakest.topic);
    if (!topic) return;

    await api("/api/practice/submit", {
      method: "POST",
      body: JSON.stringify({ topicId: topic.id, score: computed })
    });
  }

  return (
    <div className="space-y-4 fade-in-up">
      <Card className="soft-hover">
        <h2 className="text-xl font-bold">Practice Mode</h2>
        <p className="text-sm text-muted">Five focused questions. Review mistakes, then retry for confidence.</p>
      </Card>
      {quiz.map((item, index) => (
        <Card key={index} className="soft-hover">
          <p className="font-medium">Q{index + 1}. {item.q}</p>
          <Input value={answers[index]} onChange={(e) => setAnswers((prev) => prev.map((answer, idx) => idx === index ? e.target.value : answer))} placeholder="Your answer" />
        </Card>
      ))}
      <Button onClick={submit}>Submit Quiz</Button>
      {score !== null && <Card><p>Your score: {score}/100</p><p className="text-sm text-muted">Suggestion: {score < 60 ? "Revise Quadratic Equations and Trigonometric Identities" : "Great progress—keep your streak alive."}</p></Card>}
    </div>
  );
}
