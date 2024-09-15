"use client"
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
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AvatarUser() {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useSession();
  
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            style={{ borderRadius: "100%" }}
            className="relative h-16 w-16 rounded-full"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Avatar className="h-16 w-16">
              <Image
                width="100"
                height="100"
                style={{ borderRadius: "100%" }}
                className="bg-card border border-xl text-primary"
                src={data?.user?.image as string}
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