import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, parseJson } from "@/lib/http";
import { registerSchema } from "@/lib/validation";
import { signToken } from "@/lib/auth";

type RegisterBody = { name: string; email: string; password: string };

export async function POST(req: Request) {
  const body = await parseJson<RegisterBody>(req);
  if (!body) return fail("Invalid JSON body", 400);

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid input", 422, parsed.error.flatten());

  const { name, email, password } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return fail("Email already exists", 409);

  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hash },
    select: { id: true, name: true, email: true }
  });

  const token = signToken({ userId: user.id, email: user.email });
  const response = NextResponse.json({ user, token }, { status: 201 });
  response.cookies.set("mathbro_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
