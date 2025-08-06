import type { Metadata } from 'next'
import { Navbar } from '../components/Navbar'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Chatbot.ai - AI Chatbots for Service Businesses',
  description: 'Create intelligent chatbots for your service business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
