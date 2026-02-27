import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";
import { requireAuth } from "@/lib/server-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return fail("Unauthorized", 401);

  const weakAreas = await prisma.weakArea.findMany({
    where: { userId: auth.userId },
    include: { topic: true },
    orderBy: { score: "asc" }
  });

  return ok(weakAreas);
}
