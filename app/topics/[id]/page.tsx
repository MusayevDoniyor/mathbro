"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TopicDetail = {
  id: string;
  name: string;
  formulas: { id: string; title: string; expression: string }[];
  savedProblems: { id: string; question: string }[];
};

const quiz = [
  { q: "What is the derivative of x²?", a: "2x" },
  { q: "Simplify sin²θ + cos²θ", a: "1" }
];

export default function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetch(`/api/topics/${id}`).then((response) => response.json()).then(setTopic);
  }, [id]);

  if (!topic) return <p>Loading...</p>;

  return (
    <div className="space-y-4 fade-in-up">
      <Card className="soft-hover">
        <h2 className="text-2xl font-bold">{topic.name}</h2>
        <p className="text-sm text-muted">Key formulas, examples, and a mini practice set for confidence.</p>
      </Card>
      <Card className="soft-hover">
        <h3 className="mb-2 font-semibold">Key Formulas</h3>
        <ul className="space-y-2 text-sm text-muted">
          {topic.formulas.map((formula) => <li key={formula.id}>• {formula.title}: {formula.expression}</li>)}
        </ul>
      </Card>
      <Card className="soft-hover">
        <h3 className="mb-2 font-semibold">Example Problems</h3>
        <ul className="space-y-2 text-sm text-muted">
          {topic.savedProblems.length ? topic.savedProblems.map((problem) => <li key={problem.id}>• {problem.question}</li>) : <li>No examples saved yet.</li>}
        </ul>
      </Card>
      <Card className="soft-hover">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Practice Quiz</h3>
          <Button onClick={() => setShowQuiz(!showQuiz)}>Toggle Quiz</Button>
        </div>
        {showQuiz && <ul className="mt-3 space-y-2 text-sm text-muted">{quiz.map((item, index) => <li key={index}>{item.q} <span className="text-xs">(Ans: {item.a})</span></li>)}</ul>}
      </Card>
    </div>
  );
}
