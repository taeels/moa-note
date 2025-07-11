import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Tailwind CSS imports
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

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
      <body className={inter.className}>
        <Layout sidebar={<Sidebar username="John Doe" currentWeek="CW28" />}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
