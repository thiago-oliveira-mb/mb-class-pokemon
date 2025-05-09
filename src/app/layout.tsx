import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mb class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>MB Class</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
