import { getServerSession, NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import db from "@/lib/db";
import getToken from "@/utils/server/getToken";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        const bcrypt = require("bcrypt");
        console.log(await bcrypt.hash(credentials.password, 10));
        if (!user) {
          throw new Error("No user found");
        }

        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordCorrect) {
          throw new Error("Invalid password");
        }

        return { id: user.id };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      /*if (id) {
        if (account?.provider === "twitter" && account?.provider !== provider) {
          const twitterId = account.providerAccountId + "-name" + token.name;
          let exists = await db.user.findUnique({
            where: { twitter: twitterId },
          });
          if (!exists)
            await db.user.update({
              where: { id },
              data: { twitter: twitterId },
            });
        } else if (
          account?.provider === "discord" &&
          account?.provider !== provider
        ) {
          const discordId = account.providerAccountId + "-name" + token.name;
          let exists = await db.user.findUnique({
            where: { discord: discordId },
          });
          if (!exists)
            await db.user.update({
              where: { id },
              data: { discord: discordId },
            });
        }
        token.id = id;
        return token;
      }
      */
      if (account?.provider === "discord") {
        console.log(user);
        const discordId = account.providerAccountId + "-name" + token.name;
        let dbUser = await db.user.findUnique({
          where: { discord: discordId },
        });
        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              discord: discordId,
              email: `nullvalue-${crypto.randomUUID()}`,
              twitter: `nullvalue-${crypto.randomUUID()}`,
            },
          });
        }
        token.id = dbUser.id;
        token.provider = account?.provider;
      } else if (account?.provider === "credentials") {
        console.log(user);
        token.id = account?.providerAccountId;
        token.provider = account?.provider;
      } else if (account?.provider === "twitter") {
        const twitterId = account.providerAccountId + "-name" + token.name;
        let dbUser = await db.user.findUnique({
          where: { twitter: twitterId },
        });
        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              twitter: twitterId,
              email: `nullvalue-${crypto.randomUUID()}`,
              discord: `nullvalue-${crypto.randomUUID()}`,
            },
          });
        }
        token.id = dbUser.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id as string,
          provider: token.provider as string,
          name: session.user?.name as string,
          email: session.user?.email as string,
          image: session.user?.image as string,
        },
      };
    },
  },
};
