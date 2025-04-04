import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/user";
import connection from "@/app/dbConfig/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        await connection();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }

        return true;
      } catch (err) {
        console.error("Error during sign-in:", err);
        return false;
      }
    },
    async session({ session }) {
      try {
        await connection();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) session.user.id = dbUser._id.toString();
        return session;
      } catch (err) {
        console.error("Error in session callback:", err);
        return session;
      }
    },
  },
};

// ✅ This is how Next.js expects you to export route handlers in the App Router:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
