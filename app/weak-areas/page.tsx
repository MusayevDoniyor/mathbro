"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/client-api";

export default function WeakAreasPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => { api<any[]>("/api/weak-areas").then(setData).catch(() => setData([])); }, []);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold">Weak Area Tracker</h2>
        <p className="text-sm text-muted">Performance graph + personalized suggestions.</p>
      </Card>
      <Card className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.map((d) => ({ topic: d.topic.name, score: d.score }))}>
            <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} />
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="topic" /><YAxis domain={[0, 100]} /><Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <h3 className="font-semibold">Suggestions</h3>
        <ul className="text-sm text-muted">
          {data.slice(0, 3).map((d) => <li key={d.id}>• Revise {d.topic.name}</li>)}
          {!data.length && <li>• Practice daily to generate insights.</li>}
        </ul>
      </Card>
    </div>
  );
}
