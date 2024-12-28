import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import AuthButton from '@/components/AuthButton';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokedex Lite',
  description: 'A simple Pokedex web application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className} >
      <SessionProvider session={session}>
        <main className="container max-w-full px-4 py-8 bg-black">
        <div className="flex justify-end mb-4">
              <AuthButton />
            </div>
          {children}
        </main>
        </SessionProvider>
      </body>
    </html>
  )
}

