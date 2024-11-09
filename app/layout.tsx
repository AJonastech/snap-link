import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/toaster";

const sfProDisplay = localFont({
  src: [
    {
      path: './fonts/sf-pro-display-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/sf-pro-display-bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/sf-pro-display-medium.otf',
      weight: '500',
      style: 'bold',
    }
  ],
  variable: "--font-sf-pro-display",
});


export const metadata: Metadata = {
  title: "SnapLink",
  description: "Shorten, manage, and track your links easily with our fast and reliable URL shortener. Simplify sharing long URLs and gain insights with click tracking and custom link options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${sfProDisplay.variable}  antialiased`}
      >
        <TRPCProvider>
        {children}
        </TRPCProvider>
       <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
