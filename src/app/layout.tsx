import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boo - Forbidden Forest",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0c1222",
          fontFamily: "auto",
          color: "white",
        }}
      >
        <div className="overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
