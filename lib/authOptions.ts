import { getServerSession, NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import db from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "314", //process.env.AUTH_SECRET,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

        const user = await db.user.findFirst({
          where: { email: credentials.email },
        });

        const bcrypt = require("bcrypt");
        const hashed = await bcrypt.hash(credentials.password, 10);
        if (!user) {
          if (credentials.email === "admin") {
            await db.user.create({
              data: {
                mainAccount: "NONE",
                email: credentials.email,
                password: hashed,
                id: process.env.ADMIN_ID as string,
                discordId: "x",
                discordName: "x",
                twitterId: "x",
                twitterName: "x",
                mainAccountId: "x",
                mainAccountName: "x",
              },
            });
          }
          return { id: process.env.ADMIN_ID as string };
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
      if (account?.provider === "discord") {
        const discordId = account.providerAccountId;
        const discordName = token.name as string;
        let dbUser = await db.user.findUnique({
          where: { discordId },
        });
        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              mainAccount: "DISCORD",
              discordId,
              discordName,
              mainAccountId: discordId,
              mainAccountName: discordName,
              twitterId: `nullvalue-${crypto.randomUUID()}`,
              twitterName: `nullvalue-${crypto.randomUUID()}`,
            },
          });
        }
        token.id = dbUser.id;
        token.provider = account?.provider;
      } else if (account?.provider === "credentials") {
        token.id = account?.providerAccountId;
        token.provider = account?.provider;
      } else if (account?.provider === "twitter") {
        const twitterId = account.providerAccountId;
        const twitterName = token.name as string;
        let dbUser = await db.user.findUnique({
          where: { twitterId },
        });
        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              mainAccount: "TWITTER",
              twitterId,
              twitterName,
              mainAccountId: twitterId,
              mainAccountName: twitterName,
              discordId: `nullvalue-${crypto.randomUUID()}`,
              discordName: `nullvalue-${crypto.randomUUID()}`,
            },
          });
        }
        token.id = dbUser.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: async ({ session, token, newSession, trigger, user }) => {
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

