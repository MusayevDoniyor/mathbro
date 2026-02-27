import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";
import { registerSchema } from "@/lib/validation";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid input", 422);

  const { name, email, password } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return fail("Email already exists", 409);

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hash },
    select: { id: true, name: true, email: true }
  });

  const token = signToken({ userId: user.id, email: user.email });
  return ok({ user, token }, 201);
}
