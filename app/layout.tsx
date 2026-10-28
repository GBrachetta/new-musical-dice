import { Montserrat } from "next/font/google";

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  authors: [{ name: "Guillermo Brachetta" }],
  description: "A new take on Mozart's music game",
  keywords: [
    "music",
    "composition",
    "Mozart",
    "random",
    "randomisation",
    "game",
    "minuetto",
    "piano",
  ],
  title: "Musical Dice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
