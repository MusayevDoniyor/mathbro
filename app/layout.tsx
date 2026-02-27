import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata = {
  title: "MathBro",
  description: "AI-powered math learning assistant"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
