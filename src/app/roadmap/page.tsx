import Header from "@/components/header";
import RoadmapPage from "./RoadmapPage";

export default async function Component() {
  return (
    <div
      style={{
        fontFamily: "'CustomFont'",
        backgroundImage: "url('/images/media/rest1.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
      className="relative min-h-screen"
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
      <RoadmapPage />
    </div>
  );
}



