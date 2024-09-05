"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./simple/Modal";
import { useState } from "react";
import { Button } from "./ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import providers from "./homePage/providers";

export default function SignIN({ id }: { id: string }) {
  const [wantsToSignIn, setWantsToSignIn] = useState(false);

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
        <Card>
          <CardContent>
            <div className="sm:max-w-[425px] p-4">
              <div>
                <div className="text-4xl text-white font-bold">Login</div>
              </div>
              <div style={{ zIndex: 1 }} className="relative grid gap-4 py-6">
                {providers.map((p, key) => (
                  <button
                    onClick={() => signIn(p.toLowerCase())}
                    key={key}
                    className="font-bold text-4xl text-white bg-[#30e1e6]/20 hover:bg-[#30e1e6]/70 hover:text-[black] transition inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    style={{ borderRadius: "3rem" }}
                  >
                    <Image
                      src={`/images/social/${p}.png`}
                      alt={p}
                      className="h-20 w-20 mr-2 rounded-full border bg-white"
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Laptop,
  ListTodo,
  Image as ImageIcon,
  User,
  LogOut,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

function AvatarUser() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={(data?.user?.image as string) + "?height=32&width=32"}
              alt="User avatar"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuItem asChild>
          <Link href="/user/dashboard" className="flex items-center text-white">
            <Laptop className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/tasks" className="flex items-center text-white">
            <ListTodo className="mr-2 h-4 w-4" />
            <span>Tasks</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/nft" className="flex items-center text-white">
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>NFTs</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/profile" className="flex items-center text-white">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
