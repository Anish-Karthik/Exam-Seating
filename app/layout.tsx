import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Exam Seating",
  description:
    "Website to generate Hall Plan, Hall Arrangement and Student Attendance",
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
        <main className="container flex max-h-full w-screen items-center justify-center pt-4 max-sm:min-h-screen max-sm:!p-0">
          {children}
        </main>
      </body>
    </html>
  )
}
