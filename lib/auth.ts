import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("[MathBro] JWT_SECRET is not set. Falling back to insecure dev secret.");
}

const secret = JWT_SECRET || "dev-secret";

export type JwtPayload = { userId: string; email: string };

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as JwtPayload;
}

export function getTokenFromRequest(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7);

  const cookieToken = request.cookies.get("mathbro_token")?.value;
  return cookieToken || null;
}
