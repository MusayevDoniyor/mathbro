import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";
import { requireAuth } from "@/lib/server-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return fail("Unauthorized", 401);

  const items = await prisma.savedProblem.findMany({
    where: { userId: auth.userId },
    include: { topic: true },
    orderBy: { createdAt: "desc" },
    take: 10
  });
  return ok(items);
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return fail("Unauthorized", 401);

  const body = await req.json();
  if (!body.question || !body.solution) return fail("Missing fields", 422);

  const created = await prisma.savedProblem.create({
    data: {
      userId: auth.userId,
      question: body.question,
      solution: body.solution,
      topicId: body.topicId,
      confusing: Boolean(body.confusing)
    }
  });

  return ok(created, 201);
}
