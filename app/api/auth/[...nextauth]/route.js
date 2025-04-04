import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/user"; // your mongoose model
import connection from "@/app/dbConfig/db"; // your DB connect function

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
        console.log("✅ signIn callback called", user);

        await connection(); // Connect to MongoDB
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          console.log("✅ New user created");
        } else {
          console.log("ℹ️ User already exists");
        }

        return true;
      } catch (err) {
        console.error("❌ Error in signIn callback:", err);
        return false;
      }
    },
    async session({ session }) {
      // Optional: attach DB ID
      await connection();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) session.user.id = dbUser._id.toString();
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import connection from "@/app/dbConfig/db";
// import User from "@/app/models/user";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth/signin", // Optional: Custom sign-in page
//   },session: {
//     strategy: "jwt",  // Ensure session uses JWT instead of database
//   },
//   callbacks: {
//     async signIn({ user }) {
//       try {

//         console.log(user);
        
//         // await connection();
//         // const existingUser = await User.findOne({ email: user.email });

//         // if (!existingUser) {
//         //   await User.create({
//         //     name: user.name,
//         //     email: user.email,
//         //     image: user.image,
//         //   });
//         // }

//         return true;
//       } catch (err) {
//         console.error("Error saving user:", err);
//         return false;
//       }
//     },
//     async session({ session, token }) {
//       return session; // you can enrich session here if needed
//     },
//     // async session({ session }) {
//     //   // Optional: attach DB ID to session
//     //   await connection();
//     //   const dbUser = await User.findOne({ email: session.user.email });
//     //   session.user.id = dbUser?._id.toString(); // So you can use it on frontend/backend
//     //   return session;
//     // },
//   }
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
