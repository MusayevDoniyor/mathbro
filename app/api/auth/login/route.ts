import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, parseJson } from "@/lib/http";
import { loginSchema } from "@/lib/validation";
import { signToken } from "@/lib/auth";

type LoginBody = { email: string; password: string };

export async function POST(req: Request) {
  const body = await parseJson<LoginBody>(req);
  if (!body) return fail("Invalid JSON body", 400);

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid credentials", 422);

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return fail("Invalid credentials", 401);

  const passOk = await bcrypt.compare(parsed.data.password, user.password);
  if (!passOk) return fail("Invalid credentials", 401);

  const token = signToken({ userId: user.id, email: user.email });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  response.cookies.set("mathbro_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
