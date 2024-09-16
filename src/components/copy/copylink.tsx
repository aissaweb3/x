"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkIcon, CheckIcon, CopyIcon } from "lucide-react";

export default function CopyLink({ referral }: { referral: string }) {
  const [copied, setCopied] = useState(false);
  const referralLink =
    process.env.NEXT_PUBLIC_BASE_URL + "/auth?referral=" + referral;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <LinkIcon className="text-muted-foreground" />
        <Input
          value={referralLink}
          readOnly
          className="flex-1"
          aria-label="Referral link"
        />
      </div>
      <Button
        onClick={copyToClipboard}
        className="w-full"
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {copied ? (
          <>
            <CheckIcon className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
    </>
  );
}
