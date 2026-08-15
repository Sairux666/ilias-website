import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { InitialLoadProvider } from '@/components/providers/InitialLoadProvider'
import { FooterProvider } from '@/components/providers/FooterProvider'
import { ContactProvider } from '@/components/providers/ContactProvider'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/sections/Footer'

const SITE_URL = 'https://iliaschakri.com'
const TITLE = 'Ilias Chakri — Graphic & Motion Designer'
const DESCRIPTION =
  'Graphic and motion designer in Casablanca. Key visuals, campaign design, motion and AI production for brands including Coca-Cola, Fanta, Spotify, Milka and Dacia.'

export const metadata: Metadata = {
  // Makes the og/twitter image paths below resolve to absolute URLs, which
  // social scrapers require.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'Ilias Chakri' }],
  creator: 'Ilias Chakri',
  keywords: [
    'Graphic Designer',
    'Motion Designer',
    'Key Visuals',
    'Campaign Design',
    'Art Direction',
    'AI Production',
    'Casablanca',
    'Morocco',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Ilias Chakri',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@iliaschakri',
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
              {/* Inside LenisProvider: the modal pauses Lenis while it is open. */}
              <ContactProvider>
                <LoadingScreen />
                <Header />
                {children}
                <Footer />
              </ContactProvider>
            </LenisProvider>
          </FooterProvider>
        </InitialLoadProvider>
      </body>
    </html>
  )
}
