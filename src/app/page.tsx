import Header from "@/components/header";
import Video from "@/components/Video";

export default async function Component() {
  return (
    <div className="relative min-h-screen">
      <Video src="welcome" />
      {
      <Header />
      }
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-12 text-white"></main>
    </div>
  );
}

