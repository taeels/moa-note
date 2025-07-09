import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'antd/dist/reset.css'; // Import Ant Design CSS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weekly Commit Digest",
  description: "Weekly commit digest for system engineers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}