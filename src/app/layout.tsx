import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google";
import { PaymentGatewayProvider } from "./PaymentGateway/context/PaymentGatewayContext";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-mulish",
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
      <body className={`${mulish.className}  antialiased h-screen`}>
        <PaymentGatewayProvider>{children}</PaymentGatewayProvider>
      </body>
    </html>
  );
}
