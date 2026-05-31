import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { InitialLoadProvider } from '@/components/providers/InitialLoadProvider'
import { FooterProvider } from '@/components/providers/FooterProvider'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Header } from '@/components/layout/Header'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Jason Zubiate | Design Engineer',
  description: 'Jason Zubiate | Software design engineer based in Los Angeles.',
  authors: [{ name: 'Jason Zubiate' }],
  openGraph: {
    title: 'Software Design Engineer',
    description: 'Jason Zubiate | Software design engineer based in Los Angeles.',
    url: 'https://itsjay.us',
    siteName: 'itsjay.us',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-900 text-neutral-900 antialiased overscroll-none">
        <InitialLoadProvider>
          <FooterProvider>
            <LenisProvider>
              <LoadingScreen />
              <Header />
              <FloatingNav />
              {children}
              <Footer />
            </LenisProvider>
          </FooterProvider>
        </InitialLoadProvider>
      </body>
    </html>
  )
}
