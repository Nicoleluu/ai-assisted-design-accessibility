import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Assisted Design Accessibility — Nicole Lu",
  description: "A seven minute research presentation about AI, design learning, and meaningful access to design.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
