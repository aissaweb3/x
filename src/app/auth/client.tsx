"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Twitter } from "lucide-react";
import Image from "next/image";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { signIn } from "next-auth/react";

export default function Client() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle
            style={{
              fontFamily: "'CustomFont', sans-serif",
            }}
            className="text-4xl font-bold text-primary-foreground"
          >
            Someone brought HERE
          </CardTitle>
          <CardDescription
            style={{
              fontFamily: "'CustomFont', sans-serif",
            }}
            className="text-muted-foreground"
          >
            Welcome to the HAUNTED HOUSE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted text-muted-foreground p-3 rounded-md flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p
                style={{
                  fontFamily: "'CustomFont', sans-serif",
                }}
                className="text-sm"
              >
                Come on in, the house is not going to fill itself. Your freinds
                are waiting for you !
              </p>
            </div>
            <LoadingWrapper className="" >
              <Button onClick={()=>{signIn("discord")}} className="w-full text-white" variant="outline">
                <Image
                  src="/images/social/discord.png"
                  alt=""
                  width="20"
                  height="20"
                />
                Sign in with Discord
              </Button>
            </LoadingWrapper>
            <LoadingWrapper className="" >
              <Button onClick={()=>{signIn("twitter")}} className="w-full text-white" variant="outline">
                <Image
                  src="/images/social/twitter.png"
                  alt=""
                  width="20"
                  height="20"
                />
                Sign in with Twitter
              </Button>
            </LoadingWrapper>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
