import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q") || undefined;
  const formulas = await prisma.formula.findMany({
    where: search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { expression: { contains: search, mode: "insensitive" } }
          ]
        }
      : undefined,
    include: { topic: true },
    take: 100
  });

  return ok(formulas);
}
