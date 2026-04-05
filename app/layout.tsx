import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandro Gegechkori | Portfolio",
  description:
    "Junior Front-End Developer portfolio — interactive terminal style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
