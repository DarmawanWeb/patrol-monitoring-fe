import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import { AuthProvider } from "@/components/provider/auth-provider"
import { QueryProvider } from "@/components/provider/query-provider"
import LoadingPage from "@/components/shared/loading"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HotDogTracker",
  description:
    "HotDogTracker gives vendors live insights into sales, inventory and customer preferences.",
  manifest: "favicons/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QueryProvider>
            <Suspense fallback={<LoadingPage />}>
              <AuthProvider>{children}</AuthProvider>
            </Suspense>
            <Toaster position="bottom-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
