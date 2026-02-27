import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";
import { requireAuth } from "@/lib/server-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return fail("Unauthorized", 401);

  const [savedProblems, weakAreas, formulas] = await Promise.all([
    prisma.savedProblem.findMany({ where: { userId: auth.userId }, orderBy: { createdAt: "desc" }, take: 5, include: { topic: true } }),
    prisma.weakArea.findMany({ where: { userId: auth.userId }, include: { topic: true }, orderBy: { score: "asc" }, take: 5 }),
    prisma.formula.findMany({ take: 1, orderBy: { id: "desc" }, include: { topic: true } })
  ]);

  const progressStats = {
    totalSaved: savedProblems.length,
    weakTopics: weakAreas.length,
    avgScore: weakAreas.length ? Math.round(weakAreas.reduce((a, b) => a + b.score, 0) / weakAreas.length) : 0
  };

  return ok({ savedProblems, weakAreas, formulaOfTheDay: formulas[0] || null, progressStats });
}
