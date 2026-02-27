"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/client-api";

type WeakArea = {
  id: string;
  score: number;
  topic: { name: string };
};

export default function WeakAreasPage() {
  const [data, setData] = useState<WeakArea[]>([]);

  useEffect(() => {
    api<WeakArea[]>("/api/weak-areas").then(setData).catch(() => setData([]));
  }, []);

  return (
    <div className="space-y-4 fade-in-up">
      <Card className="soft-hover">
        <h2 className="text-xl font-bold">Weak Area Tracker</h2>
        <p className="text-sm text-muted">Performance graph + personalized suggestions.</p>
      </Card>
      <Card className="h-72 soft-hover">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.map((item) => ({ topic: item.topic.name, score: item.score }))}>
            <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} />
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="topic" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="soft-hover">
        <h3 className="font-semibold">Suggestions</h3>
        <ul className="text-sm text-muted">
          {data.slice(0, 3).map((item) => <li key={item.id}>• Revise {item.topic.name}</li>)}
          {!data.length && <li>• Practice daily to generate insights.</li>}
        </ul>
      </Card>
    </div>
  );
}
