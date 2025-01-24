import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./auth/auth-provider";
import Providers from "@/lib/providers";
export const metadata: Metadata = {
  title: "Codearena",
  description: "A competitive coding arena for coding chads to battle and hangout.",
};
// its basically leetcode but with risk and reward, prepare for real life coding interviews where you have to win against other candidates.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className=" font-mono text-white h-full min-h-dvh bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-fixed ">
        <AuthProvider>
          <Providers>
            <main className="px-2 max-w-screen-lg mx-auto pb-8 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-fixed">
              {children}
            </main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
