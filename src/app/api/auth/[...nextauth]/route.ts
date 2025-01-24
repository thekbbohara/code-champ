import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const { NEXTAUTH_SECRET, GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;

const handler = NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: GH_CLIENT_ID!,
      clientSecret: GH_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          token.accessToken = account.access_token!;
          token.username = profile.login; // GitHub username
          token.picture = profile.avatar_url; // GitHub avatar

          // Ensure profile.email exists
          if (!profile.email) {
            throw new Error("Profile email is missing");
          }

          // Check if the user exists in the database
          const user = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (user) {
            // If the user exists, attach their ID to the token
            token.id = user.id;
          } else {
            // Create a new user if they don't exist
            const newUser = await prisma.user.create({
              data: {
                email: profile.email,
                username: profile.login, // GitHub username
                avatarUrl: profile.avatar_url,
                name: profile.name || profile.login, // GitHub name or username
                password: "", // No password for OAuth users
              },
            });
            token.id = newUser.id;
          }
        } catch (err) {
          console.error("Error in JWT callback:", err);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || "");
        session.user.name = token.name || "";
        session.user.email = token.email || "";
        session.user.username = (token.username as string) || "";
        session.user.avatar_url = token.picture || "";
      }
      return session;
    },
  },
  debug: true, // Enable debugging
});

export { handler as GET, handler as POST };
