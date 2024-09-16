import Header from "@/components/header";
import JoinedIn from "@/components/joinedIn";
import JoinUs from "@/components/JoinUs";
import Referral from "@/components/referral/set";
import Video from "@/components/Video";
import getToken from "@/utils/server/getToken";

export default async function Home() {
  const { id } = await getToken();
  return (
    <>
      {!id ? (
        <div className="relative min-h-screen">
          <Video src="welcome" loop={false} />
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
