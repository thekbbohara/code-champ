// pages/api/auth/[...nextauth].js
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
          //await dbConnect();
          //const userExists = await UserModel.exists({ email: profile.email });
          const userExists = { _id: 1 };
          //console.log({ userExists });
          if (userExists) {
            token._id = userExists._id;
            return token;
          }
          //const newUser = new UserModel({
          //  email: profile.email,
          //  name: profile.name || profile.login,
          //  username: profile.login,
          //  avatar: profile.avatar_url,
          //});
          //const savedUser = await newUser.save();
          //token._id = savedUser._id;
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
        session.user.id = String(token._id);
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.avatar = token.picture!;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
