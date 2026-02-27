import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none focus:border-accent")} {...props} />;
}
