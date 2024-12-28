import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokedex Lite',
  description: 'A simple Pokedex web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <main className="container max-w-full px-4 py-8 bg-black">
          {children}
        </main>
      </body>
    </html>
  )
}

