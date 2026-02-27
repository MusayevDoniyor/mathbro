import { NextRequest } from "next/server";
import { askAiSchema } from "@/lib/validation";
import { fail, ok } from "@/lib/http";
import { solveMathQuestion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = askAiSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid question", 422);

  try {
    const solved = await solveMathQuestion(parsed.data.question);
    return ok(solved);
  } catch {
    return fail("Failed to solve question", 500);
  }
}
