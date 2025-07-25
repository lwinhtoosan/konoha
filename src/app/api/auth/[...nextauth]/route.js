import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        role: {
          label: "User Type",
          type: "select",
          placeholder: "customer",
        },
      },
      async authorize(credentials) {
        console.log("Credentials", credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          return null;
        }
        const isPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // console.log("userPwd", user.password);
        // console.log("credPwd", credentials.password);
        // console.log("Password match", isPassword);
        // console.log("userRole", user.user_type);
        // console.log("credRole", credentials.role);
        if (!isPassword) {
          return null;
        }

        //Custom login not include role , so when matching database's role and credentials's role (custom login) cause matching fail
        if (user.user_type && credentials.role !== credentials.role) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.user_type,
        };
      },
    }),
  ],

  //Adding custom login to credentials
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        (token.id = user.id),
          (token.name = user.name),
          (token.email = user.email);

        if (account.provider === "Credentials") {
          token.role = user.role;
        }

        //other login google/github
        else {
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          //if the email does not exist in database create new acc
          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                name: user.name || "Unnamed User",
                email: user.email,
                user_type: "customer", //default if email login
              },
            });
          }
          (token.id = dbUser.id), (token.role = dbUser.user_type); //dbUser is creating at database , user_type must same with database
          console.log("dbUser", dbUser.user_type);
        }
        console.log("TokenRole", token.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        (session.user.id = token.id),
          (session.user.name = token.name),
          (session.user.email = token.email),
          (session.user.role = token.role || "customer");
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
