import getTokenOrBack from "@/utils/server/getTokenOrBack";
import Add from "./addtasks";
import db from "@/lib/db";

export default async function AdminDashboard() {
  const { token } = await getTokenOrBack({ admin: true });
  const lastTasks = await db.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div
      style={{ fontFamily: "auto" }}
      className="light flex flex-col min-h-screen bg-muted/40"
    >
      <main className="flex-1 p-4 sm:p-6">
        <Add token={token as string} tasks={JSON.stringify(lastTasks)} />
      </main>
    </div>
  );
}
