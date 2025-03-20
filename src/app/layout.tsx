import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieModal from "@/components/MovieModal";
import { ModalProvider } from "@/context/ModalContext";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Watchlistauhduawhdau",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">
        <ModalProvider>
          <Header />
          {children}
          <MovieModal />
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
