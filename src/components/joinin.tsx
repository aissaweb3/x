"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./simple/Modal";
import { useState } from "react";
import { Button } from "./ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import providers from "./homePage/providers";
import { LoadingWrapper } from "./LoadingWrapper";
import { Card, CardContent } from "./ui/card";
import { setInLocalStorage } from "@/utils/client/localstorage/manage";
import AvatarUser from "./AvatarUser";

export default function JoinIn({ id }: { id: string }) {
  const [wantsToSignIn, setWantsToSignIn] = useState(false);

  const handleSignIn = (p: string) => {
    setInLocalStorage("old", "");
    signIn(p);
  };

  if (id)
    return (
      <SessionProvider>
        <AvatarUser />
      </SessionProvider>
    );

  return (
    <div
      style={{
        fontFamily: "'CustomFont', sans-serif",
      }}
    >
      <Button
        onClick={() => {
          setWantsToSignIn(true);
        }}
        className="rounded-full py-8 px-16 bold opacity-60 hover:opacity-100 hover:scale-110 transition"
        style={{
          borderRadius: "1rem",
          boxShadow: "0 0 10px 0 #2dd3d882",
          fontSize: "xx-large",
          background: "linear-gradient(45deg, #38fdfd, rgb(6 91 149 / 0.37))",
          color: "black",
        }}
      >
        Join Us
      </Button>
      <Modal
        isOpen={wantsToSignIn}
        onClose={() => {
          setWantsToSignIn(false);
        }}
      >
        <Card
          className="bg-[#0f1e2e]"
          style={{ background: "linear-gradient(45deg, #0f1e2e, #003c52)" }}
        >
          <CardContent>
            <div className="sm:max-w-[425px] p-8">
              <div>
                <div className="text-4xl text-white font-bold mb-4">
                  Get In The House
                </div>
              </div>
              <div style={{ zIndex: 1 }} className="relative grid gap-4">
                {providers.map((p, key) => (
                  <LoadingWrapper className=""key={key}>
                    <button
                      onClick={() => handleSignIn(p.toLowerCase())}
                      className="font-bold border hover:scale-110 text-4xl text-white bg-[#30e1e6]/20 hover:bg-[#30e1e6]/70 hover:text-[black] transition inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      style={{
                        borderRadius: "3rem",
                        width: "16rem",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Image
                        src={`/images/social/${p.toLowerCase()}.png`}
                        alt={p}
                        className="opacity-40 rounded-full w-[30%] h-[5rem]"
                        width={50}
                        height={50}
                        style={{
                          aspectRatio: "20/20",
                          objectFit: "contain",
                        }}
                      />
                      {p}
                    </button>
                  </LoadingWrapper>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
