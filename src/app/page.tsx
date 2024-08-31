
import Header from "@/components/header";
import JoinUs from "@/components/JoinUs";
import Modal from "@/components/simple/Modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Video from "@/components/Video";

export default async function Component() {
  //return <>test</>
  const join = true
  return (
    <div className="relative min-h-screen">
      <Video src="welcome" loop={false} />
      <Header showGhosts={false} />
      <JoinUs />
    </div>
  );
}

