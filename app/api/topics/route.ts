import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

export async function GET() {
  const topics = await prisma.topic.findMany({
    include: {
      formulas: true,
      savedProblems: { take: 3, orderBy: { createdAt: "desc" } }
    }
  });
  return ok(topics);
}
