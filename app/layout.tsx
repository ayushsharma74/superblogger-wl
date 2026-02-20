import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Superblogger",
  description: "Waitlist for Superblogger",
  icons: {
    icon: "/image.png"
  },
  openGraph: {
    title: "Superblogger",
    description: "Join the waitlist",
    images: ["https://superblogger.site/api/og"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Superblogger",
    description: "Join the waitlist",
    images: ["https://superblogger.site/api/og"]
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Toaster position="bottom-right" />
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
