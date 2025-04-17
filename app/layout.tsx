import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { Template } from "@/components/layout/template"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Metadata } from 'next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <Template>
              {children}
            </Template>
          </ClerkProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('http://localhost:3000'),
    title: {
      template: '%s | Portfolio',
      default: 'Portfolio - Personal Website'
    },
    description: '个人作品集展示网站,展示项目经验、技能和工作经历',
    keywords: ['portfolio', 'projects', 'experience', 'skills', 'resume'],
    openGraph: {
      title: 'Portfolio - Personal Website',
      description: '个人作品集展示网站,展示项目经验、技能和工作经历',
      url: 'http://localhost:3000',
      siteName: 'Portfolio',
      locale: 'zh_CN',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
}
