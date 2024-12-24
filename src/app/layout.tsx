import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanstakProvider from "./shared/TanstakProvider/TanstakProvider";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400','600', '700'], 
  style: ['normal', 'italic'],
  variable: '--font-mulish', 
});

export const metadata: Metadata = {
  title: "Bitnovotest",
  description: "Payments gateaway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.className}  antialiased h-screen`}
      >
        <TanstakProvider>{children}</TanstakProvider>
      </body>
    </html>
  );
}
