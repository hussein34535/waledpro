import type { ReactNode } from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "WaledNet VPN - الموقع الرسمي للتحميل (ويندوز وأندرويد)",
  description: "حمل تطبيق WaledNet VPN الرسمي للويندوز والأندرويد. اتصل بأعلى سرعة وأقصى درجات الأمان مع بروتوكولات VLESS, VMESS, SSH, و SlowDNS.",
  keywords: "WaledNet, VPN, Windows VPN, Android VPN, SlowDNS, VLESS, VMESS, SSH, تطبيق وليد نت",
  openGraph: {
    title: "WaledNet VPN - السرعة والأمان الفائق لجميع الأجهزة",
    description: "تطبيق VPN متطور يعمل على الويندوز والأندرويد بكفاءة عالية وبدون حدود.",
    images: ["/app_icon.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/app_icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/app_icon.png" />
        <meta name="theme-color" content="#07090E" />
      </head>
      <body className="min-h-screen bg-[#06080D] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}