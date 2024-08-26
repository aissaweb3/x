import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        fontFamily: "auto",
        background: "url('/images/media/dashboard.jpg')",
        color: "white",
      }}
    >
      {children}
    </div>
  );
}
