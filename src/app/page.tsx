import Header from "@/components/header";
import JoinUs from "@/components/JoinUs";
import Referral from "@/components/referral/set";
import Video from "@/components/Video";

export default async function Component({
  searchParams,
}: {
  searchParams: any;
}) {
  return (
    <div className="relative min-h-screen">
      <Video src="welcome" loop={false} />
      <Header showGhosts={false} />
      <JoinUs />
      <Referral id={searchParams.referral} />
    </div>
  );
}
