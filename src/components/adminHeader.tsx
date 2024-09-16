import db from "@/lib/db";
import AdminHeaderClient from "./adminHeaderClient";

export default async function adminHeader() {
  const pendingCount = await db.taskStatus.count({
    where: {
      status: "PENDING",
      screenShot: { not: { equals: null } },
    },
  });

  return <AdminHeaderClient pendingCount={pendingCount} />;
}
