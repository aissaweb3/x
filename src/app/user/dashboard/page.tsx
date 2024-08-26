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
    },
  });
  const count = tasks.length;
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
      {/*<main
        style={{
          fontFamily: "'CustomFont', sans-serif",
        }}
        className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-background shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <h2 className="text-2xl font-bold">XP</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">1,250</p>
                  <p style={{ fontFamily: "auto" }} className="text-[#fff]">
                    Experience Points
                  </p>
                </div>
                <TrophyIcon className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <div className="flex gap-2">
                <h2 className="text-2xl font-bold">New Tasks</h2>
                <Link className="border w-fit" href="/users/tasks">
                  <Button>See All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Complete onboarding</p>
                    <p
                      style={{ fontFamily: "auto" }}
                      className="text-[#fff] text-sm"
                    >
                      50 XP
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Write blog post</p>
                    <p
                      style={{ fontFamily: "auto" }}
                      className="text-[#fff] text-sm"
                    >
                      100 XP
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Attend team meeting</p>
                    <p
                      style={{ fontFamily: "auto" }}
                      className="text-[#fff] text-sm"
                    >
                      25 XP
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <h2 className="text-2xl font-bold">Profile</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="User Avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p
                      style={{ fontFamily: "auto" }}
                      className="text-[#fff] text-sm"
                    >
                      @johndoe
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>*/}
      <div className="relative" style={{ zIndex: "2" }}>
        <Client
          tasksSTR={JSON.stringify(tasks.slice(0, 3))}
          count={count}
          token={token}
          xp={user?.xp || 0}
        />
      </div>
      <Footer />
    </div>
  );
}
