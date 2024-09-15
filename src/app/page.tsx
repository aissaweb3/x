import Header from "@/components/header";
import JoinedIn from "@/components/joinedIn";
import JoinUs from "@/components/JoinUs";
import Referral from "@/components/referral/set";
import Video from "@/components/Video";
import getToken from "@/utils/server/getToken";

export default async function Component({
  searchParams,
}: {
  searchParams: any;
}) {
  const { id } = await getToken();
  return (
    <>
      {!id ? (
        <div className="relative min-h-screen">
          <Video src="welcome" loop={false} />
          <Header showGhosts={false} />
          <JoinUs />
          {
            //<Referral id={searchParams.referral} />
          }
        </div>
      ) : (
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: "url('/images/media/rest1.jpg')",
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
