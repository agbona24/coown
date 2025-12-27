import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COOWN - Co-Ownership Real Estate Investment Platform",
  description: "Own Together, Earn Together. Join the waitlist for Nigeria's premier fractional property ownership platform. Invest in high-value properties with multiple investors.",
  keywords: "real estate, co-ownership, property investment, fractional ownership, Nigeria real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
