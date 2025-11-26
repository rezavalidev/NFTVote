import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import ClientWrapper from './client-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFTVote | Decentralized Governance',
  description:
    'A token-gated voting platform for the Citizen NFT collection on Sepolia.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientWrapper>
          <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
            {children}
          </main>
        </ClientWrapper>
        <Toaster richColors />
      </body>
    </html>
  )
}
