import { PrismaClient } from "@prisma/client";
const db = new PrismaClient().$extends(withAccelerate());
export default db;
