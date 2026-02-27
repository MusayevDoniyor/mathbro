"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quiz = [
  { q: "What is the derivative of x²?", a: "2x" },
  { q: "Simplify sin²θ + cos²θ", a: "1" }
];

export default function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => { fetch(`/api/topics/${id}`).then((r) => r.json()).then(setTopic); }, [id]);

  if (!topic) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-2xl font-bold">{topic.name}</h2>
        <p className="text-sm text-muted">Key formulas and examples for this topic.</p>
      </Card>
      <Card>
        <h3 className="mb-2 font-semibold">Key Formulas</h3>
        <ul className="space-y-2 text-sm text-muted">{topic.formulas.map((f: any) => <li key={f.id}>• {f.title}: {f.expression}</li>)}</ul>
      </Card>
      <Card>
        <h3 className="mb-2 font-semibold">Example Problems</h3>
        <ul className="space-y-2 text-sm text-muted">{topic.savedProblems.map((p: any) => <li key={p.id}>• {p.question}</li>)}</ul>
      </Card>
      <Card>
        <div className="flex items-center justify-between"><h3 className="font-semibold">Practice Quiz</h3><Button onClick={() => setShowQuiz(!showQuiz)}>Toggle Quiz</Button></div>
        {showQuiz && <ul className="mt-3 space-y-2 text-sm text-muted">{quiz.map((q, i) => <li key={i}>{q.q} <span className="text-xs">(Ans: {q.a})</span></li>)}</ul>}
      </Card>
    </div>
  );
}
