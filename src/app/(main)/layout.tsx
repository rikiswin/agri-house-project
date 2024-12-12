import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "@/components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "AgriHouse | %s",
    default: "AgriHouse",
  },
  description: "AI-driven Data Insights",
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
        <SessionProvider>
          <Navbar />
          <ToastContainer />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
