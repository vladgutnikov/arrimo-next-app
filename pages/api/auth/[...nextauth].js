import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserAuth from "../../../database/models/UserAuth";

import connectMongo from "../../../database/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, userAuth }) {
      if (userAuth?._id) token._id = userAuth._id;
      if (userAuth?.isAdmin) token.isAdmin = userAuth.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.userAuth._id = token._id;
      if (token?.isAdmin) session.userAuth.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectMongo();
        const userAuth = await UserAuth.findOne({
          email: credentials.email,
        });
        // await db.disconnect();
        if (
          userAuth &&
          bcryptjs.compareSync(credentials.password, userAuth.password)
        ) {
          return {
            _id: userAuth._id,
            name: userAuth.name,
            email: userAuth.email,
            isAdmin: userAuth.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
