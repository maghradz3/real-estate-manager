import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import mainLogo from "../assets/mainLogo.png";
import Providers from "./providers";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header
            className="py-[38px] px-[162px] bg-[#FFFFFF
]  border border-[#DBDBDB]"
          >
            <Link href="/">
              <Image src={mainLogo} alt="Main logo" width={150} height={24} />
            </Link>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
