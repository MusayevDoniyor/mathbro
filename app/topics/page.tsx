"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/client-api";

type Topic = {
  id: string;
  name: string;
  category: string;
  formulas: { id: string }[];
};

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    api<Topic[]>("/api/topics").then(setTopics).catch(() => setTopics([]));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 fade-in-up">
      {topics.map((topic) => (
        <Link key={topic.id} href={`/topics/${topic.id}`}>
          <Card className="soft-hover">
            <h3 className="text-xl font-semibold">{topic.name}</h3>
            <p className="text-sm text-muted">Category: {topic.category}</p>
            <p className="text-sm text-muted">Formulas: {topic.formulas.length}</p>
          </Card>
        </Link>
      ))}
      {!topics.length && <Card className="text-sm text-muted">No topics available yet.</Card>}
    </div>
  );
}
