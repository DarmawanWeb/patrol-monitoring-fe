import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/theme.css";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import Providers from "@/components/layout/providers";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { siteConfig } from "@/constant/config";
import ChatComponent from "@/components/chat";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  authors: [
    {
      name: "Agus Darmawan",
      url: "https://agus-darmawan.com",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  return (
    <html lang="en">
      <body className={`${popins.className} antialiased`}>
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />

              {children}
              <ChatComponent />
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
