import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AssetStoreProvider } from "@/components/store/AssetStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AssetFlow - Digital Asset Intelligence Command Center",
  description: "Enterprise Asset Intelligence & Resource Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'dark';
                  if (saved === 'system' || !saved) {
                    var mq = window.matchMedia('(prefers-color-scheme: dark)');
                    theme = mq.matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AssetStoreProvider>
            <AppLayout>{children}</AppLayout>
          </AssetStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
