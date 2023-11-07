import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Exam Seating',
  description: 'Website to generate Hall Plan, Hall Arrangement and Student Attendance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <main className='flex w-screen max-h-full items-center justify-center container pt-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
