import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// Using Outfit as the primary font - it's very similar to Google Sans
// and is available on Google Fonts
const googleSans = Outfit({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GDG on Campus PUP Photobooth",
  description: "Capture amazing photos at GDG on Campus PUP events!",
  openGraph: {
    title: "GDG on Campus PUP Photobooth",
    description: "Capture amazing photos at GDG on Campus PUP events!",
    images: [
      {
        url: "/sharing.png",
        width: 1200,
        height: 630,
        alt: "GDG on Campus PUP Photobooth",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG on Campus PUP Photobooth",
    images: ["/sharing.png"],
    description: "Capture amazing photos at GDG on Campus PUP events!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-google-sans), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
