import Header from "@/components/header";
import Video from "@/components/Video";
import Footer from "@/components/footer";
import getTokenOrBack from "@/utils/server/getTokenOrBack";
import { Client } from "./client";
import db from "@/lib/db";

export default async function Dashboard() {
  const { token, user, id } = await getTokenOrBack({ admin: false });
  const tasks = await db.task.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      active: true,
      userStatuses: { none: { userId: id } },
    },
  });
  const count = tasks.length;
  const nftCount = await db.nFT.count();
  return (
    <div
      style={{
        background: "url('/images/media/bg1.jpg')",
      }}
    >
      <div className="relative" style={{ zIndex: "1" }}>
        <Video loop={false} src="home" />
      </div>
      <div className="relative" style={{ zIndex: "2" }}>
        <Header />
      </div>

      <div className="relative" style={{ zIndex: "2" }}>
        <Client
          tasksSTR={JSON.stringify(tasks.slice(0, 3))}
          count={count}
          nftCount={nftCount}
          token={token}
          xp={user?.xp || 0}
        />
      </div>
      <Footer />
    </div>
  );
}
