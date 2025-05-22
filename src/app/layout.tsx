import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import StoreInitializer from "../components/StoreInitializer";
import LDDynaProvider from "../lib/LDProvider";

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
        <StoreInitializer />
        <LDDynaProvider>
          <header className={styles.header}>
            <h1 className={styles.headerTitle}>MB Class</h1>
          </header>
          {children}
        </LDDynaProvider>
      </body>
    </html>
  );
}
