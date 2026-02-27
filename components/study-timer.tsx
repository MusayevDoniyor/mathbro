"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const POMODORO_MINUTES = 25;

export function StudyTimer() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_MINUTES * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (secondsLeft === 0) setRunning(false);
  }, [secondsLeft]);

  const display = useMemo(() => {
    const min = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const sec = (secondsLeft % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }, [secondsLeft]);

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">Pomodoro Study Timer</p>
      <p className="text-3xl font-bold tracking-widest">{display}</p>
      <div className="flex gap-2">
        <Button className="px-3 py-1 text-sm" onClick={() => setRunning((value) => !value)}>
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          className="bg-slate-700 px-3 py-1 text-sm"
          onClick={() => {
            setRunning(false);
            setSecondsLeft(POMODORO_MINUTES * 60);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
