import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  description:
    "Nexgen Paint brings superior coverage and vibrant colors to every project",
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
