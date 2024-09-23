"use client";
import { NFT } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import img from "next/image";
import { useState } from "react";
import Modal from "@/components/simple/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import FormBtn from "@/components/simple/FormBtn";
import buyNFT from "./server/buyNFT";
import Link from "next/link";

type NFTPro = NFT & { brought: boolean };

export default function Client({
  NFTs,
  xp,
  token,
}: {
  NFTs: NFTPro[];
  xp: number;
  token: string;
}) {
  const [nfts, setNFTs] = useState(
    NFTs.sort((a, b) => (a.brought === b.brought ? 0 : a.brought ? -1 : 1))
  );
  const [userXP, setUserXP] = useState(xp);
  const [buying, setBuying] = useState<NFTPro | null>(null);
  const nft = buying;

  const handlePurchase = async (e: FormData) => {
    if (userXP >= xp) {
      const nftId = e.get("nftId") as string;
      const result = await buyNFT({ nftId, token });
      if (!result.success) return alert(result.error);
      // success

      setNFTs((prev) =>
        prev.map((nft) => (nft.id === nftId ? { ...nft, brought: true } : nft))
      );
      setNFTs((prev) => [...prev]);
      setUserXP(userXP - xp);
      alert("NFT purchased successfully!");
    } else {
      alert("Not enough XP to purchase this NFT!");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center py-4 space-y-4">
          <h1 style={{ fontFamily: "CustomFont", fontSize: "5rem" }}>
            BUY NFT
          </h1>
        </div>
        <div className="bg-background p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold">
            You Have{" "}
            <span
              style={{
                fontFamily: "CustomFont",
                fontSize: "2rem",
                color: "yellow",
              }}
            >
              {userXP}
            </span>{" "}
            Secrets &{" "}
            <span
              style={{
                fontFamily: "CustomFont",
                fontSize: "2rem",
                color: "yellow",
              }}
            >
              {nfts.filter((n) => n.brought === true).length}
            </span>{" "}
            NFTs.
          </p>
        </div>
        {nfts.length === 0 && (
          <div className="p-4 bg-muted text-[#fff] opacity-50 text-center">
            No NFTs To Buy.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <Card key={nft.id} className="group relative overflow-hidden">
              <Image
                src={`/images/uploads/${nft.img}?t=${Date.now()}`}
                alt={nft.name}
                width={400}
                height={400}
                className="w-auto h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {nft.name}
                  </h3>
                  <p className="text-white mb-4">
                    <span
                      style={{
                        fontFamily: "CustomFont",
                        fontSize: "1.5rem",
                        color: "yellow",
                      }}
                    >
                      {nft.xp}
                    </span>{" "}
                    Secrets
                  </p>

                  <a
                    target="_blank"
                    href={nft.url}
                    className="bg-primary hover:bg-primary-dark transition-colors duration-300"
                  >
                    {nft.brought ? "View My NFT" : "Buy NFT"}
                  </a>
                  {/*
                    <Button
                      onClick={() => setBuying(nft)}
                      //disabled={userXP < nft.xp}
                      className="bg-primary hover:bg-primary-dark transition-colors duration-300"
                    >
                      {nft.brought ? "View My NFT" : "Buy NFT"}
                    </Button>
                    */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {nft && (
        <Modal isOpen={buying !== null} onClose={() => setBuying(null)}>
          <div
            className="items-center justify-center h-full"
            style={{ display: "inline-flex" }}
          >
            <Card className="h-auto w-[100%] mt-2">
              <CardHeader>
                <CardTitle
                  style={{ fontFamily: "CustomFont", fontSize: "2.5rem" }}
                >
                  {nft.name}
                </CardTitle>
              </CardHeader>
              <CardContent
                style={{ maxHeight: "90vh" }}
                className="relative overflow-hidden"
              >
                <div>
                  <div
                    style={{ zIndex: 100 }}
                    className="relative h-0 bg-black bg-opacity-75 text-[yellow] rounded-full"
                  >
                    Price: {nft.xp} Secrets
                  </div>
                  <div className="flex overflow-hidden h-[20rem] justify-center">
                    <Image
                      src={`/images/uploads/${nft.img}?t=${Date.now()}`}
                      alt={nft.name}
                      width={400}
                      height={400}
                      className="h-auto w-full object-contain rounded-lg transform transition-transform duration-1000 hover:scale-110 animate-pulse"
                    />
                  </div>
                  {nft.brought ? (
                    <div>You Now Own This NFT</div>
                  ) : (
                    <form action={handlePurchase} className="space-y-4">
                      <input type="hidden" name="nftId" value={nft.id} />
                      <FormBtn className="w-full">Buy NFT</FormBtn>
                    </form>
                  )}
                  <Button
                    onClick={() => setBuying(null)}
                    className="w-full bg-[red]/80 hover:bg-[red]/60 text-[white]"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Modal>
      )}
    </>
  );
}
