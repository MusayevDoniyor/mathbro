import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/http";
import { loginSchema } from "@/lib/validation";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid credentials", 422);

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return fail("Invalid credentials", 401);

  const passOk = await bcrypt.compare(parsed.data.password, user.password);
  if (!passOk) return fail("Invalid credentials", 401);

  const token = signToken({ userId: user.id, email: user.email });
  return ok({ user: { id: user.id, name: user.name, email: user.email }, token });
}
