import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code champ",
  description: "A competitive coding platform for coding chads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-black text-white h-full">{children}</body>
    </html>
  );
}
