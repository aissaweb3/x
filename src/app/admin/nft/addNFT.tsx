"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { Toaster, toast } from "@/components/ui/use-toast";
import Image from "next/image";

import { NFT } from "@prisma/client";
import { addNFT, deleteNFT } from "./server/manageNFT";
import FormBtn from "@/components/simple/FormBtn";

export default function Add({
  NFTs,
  token,
  userId,
}: {
  NFTs: NFT[];
  token: string;
  userId: string;
}) {
  const [nfts, setNfts] = useState<NFT[]>(NFTs);
  const [newNFT, setNewNFT] = useState<Omit<NFT, "id">>({
    name: "",
    img: "",
    xp: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNFT((prev) => ({
      ...prev,
      [name]: name === "xp" ? Number(value) : value,
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, xp, img } = newNFT;
    const result = await addNFT({ name, xp, img, token });
    if (!result.success) return alert(result.error);
    // success
    const { id } = result.success as NFT;
    setNfts((prev) => [...prev, { ...newNFT, userId, id }]);
    setNewNFT({ name: "", img: "", xp: 0 });
  };

  const handleDelete = async (e: FormData) => {
    const nftId = e.get("nftId") as string;
    const result = await deleteNFT({ token, nftId });
    if (!result.success) alert(result.error);
    setNfts((prev) => prev.filter((n) => n.id !== nftId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NFT Admin Dashboard</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">NFT Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={newNFT.name}
                onChange={handleInputChange}
                placeholder="Enter NFT name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="img">Image URL</Label>
              <Input
                type="text"
                id="img"
                name="img"
                value={newNFT.img}
                onChange={handleInputChange}
                placeholder="Enter img URL"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="xp">Price (XP)</Label>
              <Input
                type="number"
                id="xp"
                name="xp"
                value={newNFT.xp}
                onChange={handleInputChange}
                placeholder="Enter xp in XP"
                min="0"
              />
            </div>
            <FormBtn className="w-full">Add NFT</FormBtn>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Existing NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.length === 0 && (
          <div className="bg-background text-center">No NFTs Yet.</div>
        )}
        {nfts.map((nft) => (
          <Card key={nft.id}>
            <CardHeader>
              <Image
                src={`/images/nft/${nft.img}`}
                alt={nft.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{nft.name}</CardTitle>
              <p className="text-muted-foreground mt-2">Price: {nft.xp} XP</p>
            </CardContent>
            <CardFooter>
              <form action={handleDelete}>
                <input type="hidden" name="nftId" value={nft.id} />
                <FormBtn>Delete</FormBtn>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/*<Toaster />*/}
    </div>
  );
}
