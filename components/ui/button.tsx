import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-xl bg-mathGradient px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
