import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpenseAI — Autonomous Expense Agent on Arc",
  description: "AI-powered onchain expense management built on Arc Network. Approve, reject, and settle company expenses autonomously in USDC.",
  keywords: ["Arc Network", "USDC", "expense management", "AI agent", "onchain", "Circle"],
  openGraph: {
    title: "ExpenseAI — Autonomous Expense Agent",
    description: "AI-powered onchain expense management on Arc Network",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
