// pages/api/auth/add/[provider].ts

import { getSession } from "next-auth/react";

export default async function handler(req: any, res: any) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "You must be signed in." });
  }

  const provider = req.query.provider;

  res.redirect(`/api/auth/signin/${provider}`);
}
