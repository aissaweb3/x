import Footer from "@/components/footer";
import Header from "@/components/header";
import getTokenOrBack from "@/utils/server/getTokenOrBack";
import Client from "./client";
import { NFT, PrismaClient } from "@prisma/client";
import db from "@/lib/db";
const prisma = new PrismaClient();

type NFTPro = NFT & { brought: boolean };

export default async function NFT_page() {
  const { token, user, id } = await getTokenOrBack({ admin: false });
  const NFTs = await prisma.nFT.findMany();
  if (!user) return;

  const NFTsPro: NFTPro[] = await Promise.all(
    NFTs.map(async (nft) => {
      const userTaskStatus = await db.userNFT.findFirst({
        where: { userId: id as string, nftId: nft.id },
      });

      return {
        ...nft,
        brought: userTaskStatus !== null,
      };
    })
  );

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: "url('/images/media/bg1.jpg')",
        minHeight: "100vh"
      }}
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
      <Client NFTs={NFTsPro} xp={user.xp} token={token} />
      <Footer />
    </div>
  );
}
