import db from "@/lib/db";
import AdminHeaderClient from "./adminHeaderClient";
import getTokenOrBack from "@/utils/server/getTokenOrBack";

export default async function adminHeader() {
  const { token } = await getTokenOrBack({ admin: true });
  const pendingCount = await db.taskStatus.count({
    where: {
      status: "PENDING",
      screenShot: { not: { equals: null } },
    },
  });

  return <AdminHeaderClient pendingCount={pendingCount} />;
}
