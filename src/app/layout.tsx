import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./auth/auth-provider";

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
      <body className=" font-mono text-white h-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-fixed ">
        <AuthProvider>
          <main className="px-2 max-w-screen-lg mx-auto pb-8 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-fixed">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
