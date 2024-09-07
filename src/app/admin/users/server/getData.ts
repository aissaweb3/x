import db from "@/lib/db";
import { User } from "@prisma/client";

export default async function getData(perPage: number, page: number, filter: string) {
    try {
      // DB Query
      let items: User[] = [];
      if (filter === "XP") {
        items = await db.user.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          orderBy: { xp: "desc" }
        });
      } else if (filter === "Latest") {
        items = await db.user.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          orderBy: { createdAt: "desc" }
        });
      } else if (filter === "Oldest") {
        items = await db.user.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          orderBy: { createdAt: "asc" }
        });
      }
  
      const itemCount = await db.user.count();
  
      const response = { items, itemCount };
      return response;
    } catch (error) {
      throw new Error("Failed to fetch data. Please try again later.");
    }
  }