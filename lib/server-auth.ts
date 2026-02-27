import { NextRequest } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export function requireAuth(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
