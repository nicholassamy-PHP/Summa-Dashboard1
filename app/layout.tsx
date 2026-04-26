import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summa Logistics Dashboard",
  description: "Enterprise Supply Chain Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
