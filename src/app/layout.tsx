import type { Metadata } from "next";
import { Open_Sans, Inter } from 'next/font/google'
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import SessionProvider from './SessionProvider'

import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { authOptions } from "@/libs/auth";
import NextTopLoader from 'nextjs-toploader';

import { redirect } from 'next/navigation';



const openSans = Open_Sans({
  weight: ["400", "500", "600", "700", "800"],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-open",
})

const inter = Inter({
  weight: ["400", "500", "600", "700", '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await getServerSession(authOptions);


  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="WukHyBqs1sIjRy0uoRgOkoY-3clXUzFM5kfJaRSQiZY" />
      </head>
      <body
        className={`${openSans.variable} ${inter.variable} antialiased`}
      >
        <NextTopLoader
          color="#ad54f2"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={4000}
        />
        <ToastContainer
          style={{ zIndex: "9999" }}
        />

        <SessionProvider session={session} refetchInterval={1 * 60}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}