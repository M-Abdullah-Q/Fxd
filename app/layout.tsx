import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/utils/lenis";
import CustomCursor from "@/components/CustomCursor";
import FluidBG from "@/components/FluidBG";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alcovia Challenge",
  description: "Future Leaders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <FluidBG></FluidBG>

        <ReactLenis root>
          <CustomCursor />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
