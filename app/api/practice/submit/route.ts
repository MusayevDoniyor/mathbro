import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";
import { requireAuth } from "@/lib/server-auth";

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return fail("Unauthorized", 401);

  const { topicId, score } = await req.json();
  if (!topicId || typeof score !== "number") return fail("Invalid payload", 422);

  const updated = await prisma.weakArea.upsert({
    where: { userId_topicId: { userId: auth.userId, topicId } },
    create: { userId: auth.userId, topicId, score },
    update: { score: Math.max(0, Math.min(100, Math.round((score + 50) / 2))) }
  });

  return ok(updated);
}
