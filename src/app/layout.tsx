import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "sonner"
import Footer from "@/components/Footer/Footer";
import UpFooter from "@/components/Footer2/UpFooter";
import Myprovider from "@/components/MyProvider/Myprovider";
import CartContextProvider from "@/Context/CartContext";
import WishListContextProvider from "@/Context/WishListContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart - Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-dark`}>
        <Myprovider>
          <CartContextProvider>
           <WishListContextProvider>
          <NavBar />
          <div className="pt-25">
            {children}
          </div>
          <Toaster position="top-center" />
          <UpFooter />
          <Footer />
          </WishListContextProvider>
          </CartContextProvider>
        </Myprovider>
      </body>
    </html>
  );
}
