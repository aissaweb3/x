import getTokenOrBack from "@/utils/server/getTokenOrBack";
import Add from "./addtasks";
import db from "@/lib/db";

export default async function AdminDashboard() {
  const { token } = await getTokenOrBack({ admin: true });
  const lastTasks = await await db.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return (
    <div
      style={{ fontFamily: "auto" }}
      className="light flex flex-col min-h-screen bg-muted/40"
    >
      <div className="flex flex-col items-center space-y-4">
        <h1 style={{ fontFamily: "CustomFont", fontSize: "5rem" }}>
          HELLO ADMIN
        </h1>
      </div>
      <main className="flex-1 p-4 sm:p-6">
        <Add token={token as string} tasks={JSON.stringify(lastTasks)} />
      </main>
    </div>
  );
}
