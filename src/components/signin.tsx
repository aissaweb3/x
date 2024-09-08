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

export default function SignIN({ id }: { id: string }) {
  const [wantsToSignIn, setWantsToSignIn] = useState(false);

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
        className="font-bold text-white bg-primary-light/50 hover:bg-primary-light hover:text-black transition inline-flex items-center text-white justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Sign In
      </button>

      <Modal
        isOpen={wantsToSignIn}
        onClose={() => {
          setWantsToSignIn(false);
        }}
      >
        <Card className="bg-[#0f1e2e]">
          <CardContent>
            <div className="sm:max-w-[425px] p-4 mb-8">
              <div>
                <div className="text-4xl text-white font-bold">Login</div>
              </div>
              <div style={{ zIndex: 1 }} className="relative grid gap-4 py-6">
                {providers.map((p, key) => (
                  <button
                    onClick={() => signIn(p.toLowerCase())}
                    key={key}
                    className="trnasition font-bold border hover:scale-110 text-4xl text-white bg-[#30e1e6]/20 hover:bg-[#30e1e6]/70 hover:text-[black] transition inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    style={{ borderRadius: "3rem" }}
                  >
                    <Image
                      src={`/images/social/${p}.png`}
                      alt={p}
                      className="opacity-40 h-20 w-20 mr-2 rounded-full border bg-white"
                      width={50}
                      height={50}
                      style={{ aspectRatio: "20/20", objectFit: "cover" }}
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
