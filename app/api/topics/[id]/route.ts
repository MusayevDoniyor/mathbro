import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const topic = await prisma.topic.findUnique({
    where: { id: params.id },
    include: { formulas: true, savedProblems: { take: 5, orderBy: { createdAt: "desc" } } }
  });

  if (!topic) return fail("Topic not found", 404);
  return ok(topic);
}
