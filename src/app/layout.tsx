import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Boo - Forbidden Forest",
  description: `In the heart of the forbidden forest lies the "House of Shadows," a place of ancient secrets and dark magic. Once home to a mysterious family that vanished, the house is now inhabited by Boo, a ghostly guardian of its dark mysteries. In our new game, Shadow Hunter, you and your fellow adventurers must enter this cursed place, facing terrifying challenges in each room. Boo watches closely—he may help or hinder your journey. Do you have the courage to uncover the secrets of the forest and survive the "House of Shadows"? Join the legend and discover your fate.`,
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
        <div className="relative" style={{ zIndex: 3 }} >
          <Footer />
        </div>
      </body>
    </html>
  );
}
