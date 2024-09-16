"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, CheckSquare, User, Gem, LogOut } from "lucide-react";
import { LoadingWrapper } from "./LoadingWrapper";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function AvatarUser() {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <Image
            style={{ borderRadius: "100%" }}
            className="border bg-[white]/50"
            width="100"
            height="100"
            src={data?.user?.image as string}
            alt=""
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{ background: "linear-gradient(45deg, #0f1e2e, #003c52)" }}
        className="w-56"
        align="end"
        forceMount
      >
        <LoadingWrapper className="">
          <Link href="/user/dashboard">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        </LoadingWrapper>

        <LoadingWrapper className="">
          <Link href="/user/tasks">
            <DropdownMenuItem>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Tasks</span>
            </DropdownMenuItem>
          </Link>
        </LoadingWrapper>

        <LoadingWrapper className="">
          <Link href="/user/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </LoadingWrapper>

        <LoadingWrapper className="">
          <Link href="/user/nft">
            <DropdownMenuItem>
              <Gem className="mr-2 h-4 w-4" />
              <span>NFTs</span>
            </DropdownMenuItem>
          </Link>
        </LoadingWrapper>

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Get Out of the House</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
