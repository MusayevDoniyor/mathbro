import { z } from "zod";

const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[0-9]/, "Password must include a number");

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: passwordRule
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const askAiSchema = z.object({
  question: z.string().min(5).max(500),
  topicId: z.string().optional()
});
