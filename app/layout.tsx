import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import mainLogo from "../assets/mainLogo.png";
import Providers from "./providers";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "./ErrorBoundary";

const firaGoReg = localFont({
  src: "./fonts/FiraGO-Regular.woff2",

  variable: "--font-firaGO",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Real Estate Manager",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaGoReg.variable} antialiased`}>
        <ErrorBoundary>
          <Providers>
            <header
              className="py-[38px] px-[162px] bg-[#FFFFFF
]  border border-[#DBDBDB]"
            >
              <Link href="/">
                <Image src={mainLogo} alt="Main logo" width={150} height={24} />
              </Link>
            </header>
            <div className="pb-[50px]">
              {children}
              <Toaster />
            </div>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
