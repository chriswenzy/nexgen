import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReduxProvider } from "./provider";
import CustomCursor from "@/util/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Transform Your Space with the Power of Color",
  icons: {
    icon: "/nexgen-logo.png",
  },
  description:
    "Nexgen Paint brings superior coverage and vibrant colors to every project",
  openGraph: {
    title: "Transform Your Space with the Power of Color",
    description:
      "Nexgen Paint brings superior coverage and vibrant colors to every project",
    url: "https://nexgen-phi.vercel.app",
    siteName: "Nexgen Paint",
    images: [
      {
        url: "https://nexgen-phi.vercel.app/nexgen-logo.png",
        width: 1200,
        height: 630,
        alt: "Nexgen Paint Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transform Your Space with the Power of Color",
    description:
      "Nexgen Paint brings superior coverage and vibrant colors to every project",
    images: ["https://nexgen-phi.vercel.app/nexgen-logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />

        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
