// pages/api/auth/[...nextauth].js
import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
const { SECRET, GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;
const handler = NextAuth({
  secret: SECRET,
  providers: [
    // OAuth authentication providers
    GithubProvider({
      clientId: GH_CLIENT_ID!,
      clientSecret: GH_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    // This callback is triggered when the JWT token is created
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Attach additional GitHub profile data to the token
        try {
          token.accessToken = account.access_token!;
          token.username = profile.login; // GitHub username
          token.picture = profile.avatar_url; // GitHub avatar
          // Check if the user exists in the database
          const user = await prisma.user.findUnique({
            where: { email: profile.email! },
          });
          if (user) {
            // If the user exists, attach their ID to the token
            token.id = user.id;
            return token;
          }
          const newUser = await prisma.user.create({
            data: {
              email: profile.email!,
              username: profile.login, // GitHub username
              avatarUrl: profile.avatar_url,
              name: profile.name || profile.login, // GitHub name or username
              password: "", // No password for OAuth users
            },
          });
          token.id = newUser.id;

          console.log({ token });
        } catch (err) {
          console.log(err);
        }
      }
      return token;
    },

    // This callback is triggered whenever a session is created or updated
    async session({ session, token }) {
      // Cast the `token` to the custom `JWT` type
      if (session.user) {
        // Attach the JWT token details to the session
        session.user.id = String(token.id);
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.avatar_url = token.picture;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
