import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Your Name",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
