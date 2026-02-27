import { NextResponse } from "next/server";

type ErrorDetails = Record<string, unknown> | undefined;

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400, details?: ErrorDetails) {
  return NextResponse.json({ error: message, details }, { status });
}

export async function parseJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
