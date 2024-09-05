import Header from "@/components/header";

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

import { Trees, Skull, Ghost, Bone, Axe } from "lucide-react";

function RoadmapPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-white font-horror">
          Forbidden Forest Roadmap
        </h1>
        <p className="text-xl text-center mb-12 opacity-70 font-spooky">
          Venture into the unknown... if you dare
        </p>

        <div className="space-y-12">
          <RoadmapItem
            icon={<Trees className="w-8 h-8 text-green-500" />}
            phase="Phase 1: Seed of Terror"
            description="Launch of the Forbidden Forest website and social media channels. Begin community building and lore development."
          />

          <RoadmapItem
            icon={<Skull className="w-8 h-8 text-white" />}
            phase="Phase 2: Whispers in the Dark"
            description="Release of the Forbidden Forest whitepaper. Announce airdrop details and eligibility criteria."
          />

          <RoadmapItem
            icon={<Ghost className="w-8 h-8 text-purple-400" />}
            phase="Phase 3: Spectral Airdrop"
            description="Execute the airdrop of Forbidden Tokens (FBT) to eligible participants. Open staking platform for FBT holders."
          />

          <RoadmapItem
            icon={<Bone className="w-8 h-8 text-yellow-200" />}
            phase="Phase 4: Unearthing Horrors"
            description="Launch of the Forbidden Forest NFT collection. Holders gain access to exclusive areas of the forest."
          />

          <RoadmapItem
            icon={<Axe className="w-8 h-8 text-gray-400" />}
            phase="Phase 5: Legends of the Damned"
            description="Release of the Forbidden Forest play-to-earn game. Brave souls can explore the forest and face its terrors."
          />
        </div>
      </div>
    </div>
  );
}

function RoadmapItem({ icon, phase, description }: any) {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0 text-primary w-12 h-12 rounded-full flex items-center justify-center border-2 border-red-800 group-hover:border-white transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-2 transition-colors duration-300">
          {phase}
        </h2>
        <p
          style={{ color: "white", fontFamily: "auto" }}
          className="opacity-70 group-hover:text-gray-300 transition-colors duration-300"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
