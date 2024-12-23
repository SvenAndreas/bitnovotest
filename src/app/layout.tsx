import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanstakProvider from "./shared/TanstakProvider/TanstakProvider";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstakProvider>{children}</TanstakProvider>
      </body>
    </html>
  );
}
