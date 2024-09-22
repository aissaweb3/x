import Header from "@/components/header";
import RoadmapPage from "./RoadmapPage";
import Footer from "@/components/footer";

export default async function Component() {
  return (
    <div
      style={{
        fontFamily: "'CustomFont'",
        backgroundImage: "url('/images/media/roadmap.png')",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingBottom: "5rem"
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



