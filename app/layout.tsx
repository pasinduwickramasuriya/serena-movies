import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SERENA - Watch Movies Online",
  description: "A premium movie streaming experience built with Next.js and TMDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#141414]">{children}</body>
    </html>
  );
}
