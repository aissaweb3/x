"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./simple/Modal";
import { useState } from "react";
import { Button } from "./ui/button";
import providers from "./homePage/providers";
import { signIn, signOut } from "@/utils/auth/auth";
import { Card, CardContent } from "./ui/card";
import AvatarUser from "./AvatarUser";
import { SessionProvider } from "next-auth/react";
import { setInLocalStorage } from "@/utils/client/localstorage/manage";
import JoinIn from "./joinin";

export default function SignIN({ id }: { id: string }) {

  return <JoinIn id={id} />

  const [wantsToSignIn, setWantsToSignIn] = useState(false);

  const handleSignIn = (p: string) => {
    console.log("signing in ...");
    
    setInLocalStorage("old", "");
    signIn(p);
  };

  if (id)
    return (
      <div
        style={{
          alignContent: "center",
        }}
      >
        <SessionProvider>
          <AvatarUser />
        </SessionProvider>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'CustomFont', sans-serif",
        alignContent: "center",
      }}
    >
      <button
        onClick={() => {
          setWantsToSignIn(true);
        }}
        className="font-bold border hover:scale-110 text-3xl text-white bg-[#30e1e6]/20 hover:bg-[#30e1e6]/70 hover:text-[black] transition inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
        Sign In
      </button>

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
                  <button
                    onClick={() => handleSignIn(p.toLowerCase())}
                    key={key}
                    className="font-bold border hover:scale-110 text-4xl text-white bg-[#30e1e6]/20 hover:bg-[#30e1e6]/70 hover:text-[black] transition inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    style={{
                      borderRadius: "3rem",
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
                        objectFit: "cover",
                      }}
                    />
                    Sign in with {p}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
