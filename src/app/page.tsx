import Header from "@/components/header";
import JoinedIn from "@/components/joinedIn";
import JoinUs from "@/components/JoinUs";
import Referral from "@/components/referral/set";
import Video from "@/components/Video";
import getToken from "@/utils/server/getToken";
import { redirect } from "next/navigation";
import AudioPlayer from "@/components/ghostAudio";

export default async function Home() {
  const { id } = await getToken();

  if (id === process.env.ADMIN_ID) redirect("/admin/dashboard");

  return (
    <>
      {!id ? (
        <div className="relative min-h-screen">
          <div
            className="absolute inset-0 z-[-1] overflow-hidden"
            style={{ minHeight: "100vh" }}
          >
            <div
              style={{
                margin: 0,
                padding: 0,
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <iframe
                src="/test"
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
                title="Video"
              ></iframe>
            </div>
            <AudioPlayer play loop={false} name="welcome" />
          </div>
          <Header showGhosts={false} />
          <JoinUs />
        </div>
      ) : (
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: "url('/images/media/room (2).jpg')",
            minHeight: "100vh",
          }}
        >
          <div className="relative" style={{ zIndex: "2" }}>
            <Header showGhosts />
          </div>
          <JoinedIn />
        </div>
      )}
    </>
  );
}
