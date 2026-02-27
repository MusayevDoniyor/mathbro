import { NextRequest } from "next/server";
import { fail, ok } from "@/lib/http";
import { requireAuth } from "@/lib/server-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) return fail("Unauthorized", 401);
  return ok({ message: "Protected route accessible", user: auth });
}
