import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { UserProvider } from "./components/context/UserContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Havagala",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Toaster />
          <Navbar />
          <main className="mx-auto block max-w-[1000px] p-8">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
