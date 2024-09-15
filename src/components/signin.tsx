"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./simple/Modal";
import { useState } from "react";
import { Button } from "./ui/button";
import providers from "./homePage/providers";
import { Card, CardContent } from "./ui/card";
import AvatarUser from "./AvatarUser";
import { SessionProvider } from "next-auth/react";
import { setInLocalStorage } from "@/utils/client/localstorage/manage";
import JoinIn from "./joinin";

export default function SignIN({ id }: { id: string }) {
  return <JoinIn id={id} />
}
