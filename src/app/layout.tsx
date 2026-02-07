import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://meetingsync.io"
  ),
  title: {
    default: "MeetingSync – Turn Meeting Notes Into Action Items Automatically",
    template: "%s | MeetingSync",
  },
  description:
    "MeetingSync is the meeting notes software that automatically detects action items and syncs them to Trello, ClickUp, Asana & more. Never forget a task again.",
  keywords: [
    "meeting notes software",
    "meeting productivity tool",
    "action item tracker",
    "meeting action items",
    "project management sync",
    "meeting notes to tasks",
    "AI meeting assistant",
    "Trello integration",
    "ClickUp integration",
    "Asana integration",
  ],
  authors: [{ name: "MeetingSync" }],
  creator: "MeetingSync",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MeetingSync",
    title: "MeetingSync – Turn Meeting Notes Into Action Items Automatically",
    description:
      "AI-powered meeting notes software that syncs action items to your project management tools. Works with Trello, ClickUp, Asana & more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeetingSync – Meeting Notes Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetingSync – Turn Meeting Notes Into Action Items Automatically",
    description:
      "AI-powered meeting notes software that syncs action items to your project management tools.",
    images: ["/og-image.png"],
    creator: "@meetingsync",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
