"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { CodeChamp } from "@/components/common/codeChamp";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") return null
  if (status === "authenticated") return router.push("/")
  return (
    <main className="min-h-screen flex flex-col">
      <nav className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <CodeChamp />
            <span className="text-xl font-bold">Code champ</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-gray-200 font-bold">Well come </CardTitle>
            <CardDescription className="text-gray-400 font-semibold">
              Auth into your codechamp account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full flex justify-center items-center bg-transparent  hover:bg-transparent"
              variant="outline"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <Github className="mr-2 h-4 w-4 text-white" />
              <span className="text-gray-400 font-medium">
                Continue with GitHub
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
