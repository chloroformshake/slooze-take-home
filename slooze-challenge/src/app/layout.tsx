import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slooze Commodities",
  description: "Take-home challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
